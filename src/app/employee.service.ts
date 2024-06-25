import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Employee {
  id: number;
  name: string;
  companyName: string;
  email: string;
  contactNo: string;
  designation: string;
  avatar: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [
    // Pre-defined employee list
  ];

  constructor() { }

  getEmployees(): Observable<Employee[]> {
    return of(this.employees);
  }

  getEmployee(id: number): Observable<Employee | any> {
    const employee = this.employees.filter(e => e.id == id);
    return of(employee);
  }

  addEmployee(employee: Employee): void {
    employee.id = this.employees.length + 1;
    this.employees.push(employee);
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
  }
}
