// src/employeeData.js
export const getEmployees = () => {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    return employees;
  };
  
  export const addEmployee = (employee) => {
    const employees = getEmployees();
    employees.push(employee);
    localStorage.setItem("employees", JSON.stringify(employees));
  };
  
  export const updateEmployee = (employee) => {
    const employees = getEmployees();
    const updatedEmployees = employees.map((e) =>
      e.id === employee.id ? employee : e
    );
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };
  
  export const deleteEmployee = (id) => {
    const employees = getEmployees();
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
  };
  