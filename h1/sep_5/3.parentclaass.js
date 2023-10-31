class Department {
    constructor(name, location) {
    this.name = name;
    this.location = location;
    this.employees = [];
    }
    
    addEmployee(employee) {
    this.employees.push(employee);
    }
    }
    
    class Employee {
    constructor(name, age) {
    this.name = name;
    this.age = age;
    }
    display(){
    return this.name
    }
    }
    
    
    const hrDepartment = new Department("HR", "New York");
    const Alok = new Employee("Alok", 23);
    const Deepak = new Employee("Deepak", 23);
    
    hrDepartment.addEmployee(Alok);
    hrDepartment.addEmployee(Deepak);
    
    console.log(`Employees in the ${hrDepartment.name} department at ${hrDepartment.location}:`);
    
    console.log(Alok.display());
    console.log(Deepak.display());