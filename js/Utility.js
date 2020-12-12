const stringifyDate = (date) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;                
}

const checkName = (name) => {
    let nameRegex= RegExp('^[A-Z][a-zA-Z]{2,}([ ][A-Z]([a-z]{1,})*)*$');
    if(!nameRegex.test(name)) throw "Name is Incorrect";
}

const checkStartDate = (startDate) => {
    let now = new Date();
    if(startDate > now) throw "Start Date is a Future Date";
}