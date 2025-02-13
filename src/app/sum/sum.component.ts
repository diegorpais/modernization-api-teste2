import { Component } from '@angular/core';

@Component({
  selector: 'app-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.css']
})
export class SumComponent {
  firstNumber: string = '';
  secondNumber: string = '';
  result: number | null = null;
  errorMessage: string = '';

  calculateSum(): void {
    const num1 = parseFloat(this.firstNumber);
    const num2 = parseFloat(this.secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      this.errorMessage = 'Please enter valid numeric values.';
      this.result = null;
      return;
    }

    this.result = num1 + num2;
    this.errorMessage = '';
  }
}