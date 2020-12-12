class EmployeePayrollData {
    id;

    get name(){ 
        return this._name;
    }

    set name(name){ 
        let nameRegex = RegExp('^[A-Z][a-zA-Z]{2,}([ ][A-Z]([a-z]{1,})*)*$');
        if(nameRegex.test(name)){
            this._name = name;
        } else {
            throw "Name is Incorrect";
        }
    }

    set profilePic(profilePic){ 
        this._profilePic = profilePic;
    }

    get profilePic(){ 
        return this._profilePic;
    }

    set gender(gender){ 
        this._gender = gender;
    }

    get gender(){ 
        return this._gender;
    }

    set department(department){ 
        this._department = department;
    }

    get department(){ 
        return this._department;
    }

    set salary(salary){ 
        this._salary = salary;
    }

    get salary(){ 
        return this._salary;
    }

    set startDate(startDate){ 
        const date = new Date();
        if(startDate <= date){
            this._startDate = startDate;
        }
        else throw "Enter correct date";
    }

    get startDate(){ 
        return this._startDate;
    }

    set notes(notes){ 
        this._notes = notes;
    }

    get notes(){ 
        return this._notes;
    }

    toString(){
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        const empDate = !this.startDate ? "undefined" :
                        this.startDate.toLocaleDateString("en-US", options);
        return "id="+this.id+", name =" + this.name + ", profilePic =" + this.profilePic + ", gender =" + this.gender +
                ", department ="+ this.department +", salary ="+ this.salary +", startDate ="+ empDate +", notes ="+ this.notes;
    }
}
