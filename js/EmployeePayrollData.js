class EmployeePayrollData {
    constructor(...params){
        this.name = params[0];
        this.profilePic = params[1];
        this.gender = params[2];
        this.department = params[3];
        this.salary = params[4];
        this.startDate = params[5];
        this.notes = params[6];
    }

    get name(){ 
        return this._name;
    }

    set name(name){ 
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if(nameRegex.test(name.value)){
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

    set startDate(startDate){ 
        this._state = state;
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
        return "name =" + this.name + ", profilePic =" + this.profilePic + ", gender =" + this.gender +", department ="+ this.department +", salary ="+this.salary+", startDate ="+this.startDate+", notes ="+this.notes;
    }
}
