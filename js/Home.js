let employeePayrollList;
window.addEventListener('DOMContentLoaded', (event) =>{
    if(site_properties.use_local_storage.match(true)){
        getEmployeePayrollDataFromStorage();
    } else getEmployeePayrollDataFromServer();
});

const getEmployeePayrollDataFromStorage = () => {
    employeePayrollList = localStorage.getItem('EmployeePayrollList') ?
                          JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();                      
}

const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}

const getEmployeePayrollDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(responseText => {
            employeePayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: "+JSON.stringify(error));
            employeePayrollList = [];
            processEmployeePayrollDataResponse();
        });
}

const createInnerHtml = () => {
    const headerHtml = "<th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    if(employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;                   
    for(const employeePayrollData of employeePayrollList){                   
        innerHtml = `${innerHtml}
            <tr>
                <td>
                    <img class="profile" src="${employeePayrollData._profilePic}" alt="Profile pic">
                </td>
                <td>${employeePayrollData._name}</td>
                <td>${employeePayrollData._gender}</td>
                <td>${getDeptHtml(employeePayrollData._department)}</td>
                <td>&#8377; ${employeePayrollData._salary}</td>
                <td>${stringifyDate(employeePayrollData._startDate)}</td>
                <td>
                    <img id="${employeePayrollData.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                    <img id="${employeePayrollData.id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
                </td>
            </tr>
        `;
    }        
    document.querySelector('#table-display').innerHTML = innerHtml;                   
};

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml}<div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
};

const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empData => empData.id == node.id);
    if(!employeePayrollData) return;
    const index = employeePayrollList.map(empData => empData.id)
                  .indexOf(employeePayrollData.id);
    employeePayrollList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")){
        localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
        document.querySelector(".emp-count").textContent = employeePayrollList.length;
        createInnerHtml();   
    } else {
        const deleteURL = site_properties.server_url + employeePayrollData.id.toString();
        makeServiceCall("DELETE", deleteURL, false)
            .then(responseText => {
                document.querySelector(".emp-count").textContent = employeePayrollList.length;
                createInnerHtml();
            })
            .catch(error => {
                console.log("Delete Error Status: "+JSON.stringify(error));
            });
        
    }               
}

const update = (node) => {
    let empPayrollData = employeePayrollList.find(empData => empData.id == node.id);
    if(!empPayrollData) return;
    localStorage.setItem('editEmp',JSON.stringify(empPayrollData));
    window.location.replace(site_properties.add_emp_payroll_page);
}