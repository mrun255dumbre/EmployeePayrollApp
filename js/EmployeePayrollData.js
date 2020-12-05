class EmployeePayrollData {
    
    get id(){ 
        return this._id;
    }

    set id(id){ 
        this._id = id;
    }

    get name(){ 
        return this._name;
    }

    set name(name){ 
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
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

    set startDate(startDate){ 
        this._startDate = startDate;
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
