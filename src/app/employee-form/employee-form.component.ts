import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  employee: Employee = {
    id: 0,
    name: '',
    companyName: '',
    email: '',
    contactNo: '',
    designation: '',
    avatar: ''
  };
  
  isEditMode: boolean = false;
  avatars = [
    { name: 'Avatar 1', path: '../../assets/avtars/beard_mustache.jpg' },
    { name: 'Avatar 2', path: '../../assets/avtars/curly-hair.jpg' },
    { name: 'Avatar 3', path: '../../assets/avtars/well-dressed.jpg' }  
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.employeeService.getEmployee(id).subscribe(employee => {
        if (employee) {
          this.employee = employee[0];
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employee);
    } else {
      this.employeeService.addEmployee(this.employee);
    }
    this.router.navigate(['/']);
  }

}
