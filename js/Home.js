window.addEventListener('DOMContentLoaded', (event) =>{
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                       "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;                   
    let employeePayrollList = createEmployeePayrollJSON();
    for(const employeePayrollData of employeePayrollList){                   
        innerHtml = `${innerHtml}
            <tr>
                <td>
                    <img class="profile" src="${employeePayrollData._profilePic}" alt="Profile pic">
                </td>
                <td>${employeePayrollData._name}</td>
                <td>${employeePayrollData._gender}</td>
                <td>${getDeptHtml(employeePayrollData._department)}</td>
                <td>${employeePayrollData._salary}</td>
                <td>${employeePayrollData._startDate}</td>
                <td>
                    <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                    <img name="${employeePayrollData._id}" onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
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
}

const createEmployeePayrollJSON = () => {
    let employeeListPayrollLocal = [
        {
            _name: 'Mrunalini',
            _gender: 'Female',
            _department: ['HR','Finance'],
            _salary: '500000',
            _startDate: '20 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse 1.png'
        },
        {
            _name: 'Aditya',
            _gender: 'Male',
            _department: ['Engineer'],
            _salary: '400000',
            _startDate: '14 Sept 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -3.png'
        }
    ];
    return employeeListPayrollLocal;
 };