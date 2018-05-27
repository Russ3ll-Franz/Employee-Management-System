import { Component, Input } from "@angular/core";
import { IEmployee } from "../../../shared/repo";
import { EmployeeService } from "../../../shared/employee.service";

@Component({
  templateUrl: 'expansion.component.html',
})
export class ExpansionComponent {
  @Input() childData: IEmployee;

  constructor(private employeeService: EmployeeService) { }
}
