// SecretSantaGame Class
import Employee from "./employee";
import { SecretGiversInterface } from "./model.types";

class SecretSantaGame {
  employees: Employee[];
  previousAssignments: SecretGiversInterface[];

  constructor(
    employees: Employee[],
    previousAssignments: SecretGiversInterface[],
  ) {
    this.employees = employees;
    this.previousAssignments = previousAssignments;
  }

  generateAssignments(): Map<Employee, Employee> {
    let success = false;
    let assignments: Map<Employee, Employee> | null = null;

    while (!success) {
      assignments = this.tryGenerateAssignments();
      if (assignments) success = true;
    }

    return assignments!;
  }

  private tryGenerateAssignments(): Map<Employee, Employee> | null {
    const assignments = new Map<Employee, Employee>();
    const receivers = [...this.employees];

    for (const employee of this.employees) {
      const availableReceivers = receivers.filter(
        (receiver) =>
          receiver.name !== employee.name &&
          !this.previousAssignments.some(
            (assignment) =>
              assignment.employee_email === employee.email &&
              assignment.secret_emp_email === receiver.email,
          ),
      );

      if (availableReceivers.length === 0) {
        return null;
      }

      const chosenIndex = Math.floor(Math.random() * availableReceivers.length);
      const chosenReceiver = availableReceivers[chosenIndex];
      assignments.set(employee, chosenReceiver);

      receivers.splice(receivers.indexOf(chosenReceiver), 1);
    }

    return assignments;
  }
}

export default SecretSantaGame;
