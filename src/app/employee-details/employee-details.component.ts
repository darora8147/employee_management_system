import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log('id from', id)
    this.employeeService.getEmployee(id).subscribe(employee => {
      this.employee = employee[0];
    });
  }

  confirmDelete(): void {
    if (this.employee && confirm("Are you sure you want to delete this employee?")) {
      this.employeeService.deleteEmployee(this.employee.id);
      this.router.navigate(['/']);
    }
  }
}
