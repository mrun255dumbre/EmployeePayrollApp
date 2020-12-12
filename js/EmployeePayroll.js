let isUpdate = false;
let employeePayrollObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });

    const name = document.querySelector('#name');
    name.addEventListener('input', function(){
        if(name.value.length == 0){
            setTextValue('.name-error', "");
            return;
        }
        try{
            checkName(name.value);
            setTextValue('.name-error', "");
        } catch(exception){
            setTextValue('.name-error', exception);
        }
    });

    const startDate = document.querySelector("#startDate");
    const day = document.querySelector("#day");
    const month = document.querySelector("#month");
    const year = document.querySelector("#year");
    startDate.addEventListener("input", function(){
        try{
            checkStartDate(new Date( Date.UTC(year.value, month.value - 1, day.value)));
            setTextValue(".date-error","");
        }catch(e){
            setTextValue(".date-error",e);
        }
    });
    checkForUpdate();
});

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try{
        setEmployeePayrollObject();
        if(site_properties.use_local_storage.match("true")){
            createAndUpdateStorage();
            resetForm();
            window.location.replace(site_properties.home_page);
        } else {
            createOrUpdateEmployeePayroll();
        }
    } catch(exception){
        return;
    }
}

const createOrUpdateEmployeePayroll = () => {
    let postURL = site_properties.server_url;
    let methodCall = "POST";
    if(isUpdate){
        methodCall = "PUT";
        postURL = postURL + employeePayrollObj.id.toString();
    }
    makeServiceCall(methodCall, postURL, true, employeePayrollObj)
        .then(responseText => {
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            throw error;
        });
}

const setEmployeePayrollObject = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true")){
        employeePayrollObj.id = createNewId();
    }
    employeePayrollObj._name= getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    employeePayrollObj._startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value) - 1, parseInt(document.getElementById("day").value));
  };

function createAndUpdateStorage() {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList) {
        let empPayrollData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
        if(!empPayrollData){                     
            employeePayrollList.push(employeePayrollObj);
        } else {
            const index = employeePayrollList
                          .map(empData => empData.id)
                          .indexOf(empPayrollData.id);
            employeePayrollList.splice(index, 1, employeePayrollObj);              
        }
    } else {
        employeePayrollList = [employeePayrollObj];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

const createEmployeePayrollData = () => {
    let employeePayrollData = new EmployeePayrollData();
    try{
        employeePayrollData.name = getInputValueById('#name');
    } catch(exception){
        setTextValue('.name-error', exception);
    }
    employeePayrollData.id = createNewId();
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.notes = getInputValueById('#notes');
    employeePayrollData.startDate = new Date(parseInt(document.getElementById("year").value), parseInt(document.getElementById("month").value) - 1, parseInt(document.getElementById("day").value));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const createNewId = () => {
    let empId = localStorage.getItem("EmployeeID");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeID", empId);
    return empId;
};


const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem("editEmp");
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}; 

const resetForm = () => {
    setValue("#name", "");
    unsetSelectedValues("[name=profile]");
    unsetSelectedValues("[name=gender]");
    unsetSelectedValues("[name=department]");
    setValue("#salary", "");
    setValue("#notes", "");
    setSelectedIndex("#day", 0);
    setSelectedIndex("#month", 0);
    setSelectedIndex("#year", 0);
};  

const setForm = () => {
    setValue("#name", employeePayrollObj._name);
    setSelectedValues("[name=profile]", employeePayrollObj._profilePic);
    setSelectedValues("[name=gender]", employeePayrollObj._gender);
    setSelectedValues("[name=department]", employeePayrollObj._department);
    setValue("#salary", employeePayrollObj._salary);
    setTextValue(".salary-output", employeePayrollObj._salary);
    setValue("#notes", employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    let month = new Date(date).getMonth() + 1;
    setValue("#day", date[0]);
    setValue("#month", month);
    setValue("#year", date[2]);
};

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
};

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
};
  
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)){
           if(value.includes(item.value)) item.checked = true;
        }
        else if(item.value == value) item.checked = true;
    });
};

const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
};

const unsetSelectedValues = (propertyValue) =>{
 let allItems = document.querySelectorAll(propertyValue);
 allItems.forEach(item => {
   item.checked = false;
 });
};