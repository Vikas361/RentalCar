import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}

  carName: string = '';
  ratePerHr: number | null = null;
  ratePerDay: number | null = null;

  carList: Car[] = [];
  addCar() {
    let car = {
      Name: this.carName,
      RatePerHour: this.ratePerHr,
      RatePerDay: this.ratePerDay,
    };
    this.carList.push(car);
    this.carName = '';
    this.ratePerDay = null;
    this.ratePerHr = null;
  }

  selectedCar: Car | String = '';
  duration: String = '';
  noOfCars: number | null = null;

  Hours: number | null = null;
  Days: number | null = null;
  TotalBill: number = 0;

  BookedCars: BookedCar[] = [];
  addToBook() {
    for (let car of this.carList) {
      if (car.Name === this.selectedCar) {
        let temp: BookedCar = {
          Name: this.selectedCar,
          NumberOfHours: this.Hours,
          NumberOfDays: this.Days,
          RatePerHour: car.RatePerHour,
          RatePerDay: car.RatePerDay,
          NumberOfCars: this.noOfCars,
        };
        this.BookedCars.push(temp);
      }
    }
    this.Hours = null;
    this.Days = null;
    this.noOfCars = null;
    this.selectedCar = '';
    this.duration = '';
    console.log(this.BookedCars);
  }

  CalculateBill() {
    let totalHoursBill: number = 0;
    let totalDaysBill: number = 0;
    this.TotalBill = 0;
    for (let carData of this.BookedCars) {
      if (
        carData.NumberOfDays != null &&
        carData.NumberOfCars &&
        carData.RatePerDay
      ) {
        totalHoursBill +=
          carData.NumberOfDays * carData.NumberOfCars * carData.RatePerDay;
      } else if (
        carData.NumberOfHours != null &&
        carData.NumberOfCars &&
        carData.RatePerHour
      ) {
        totalHoursBill +=
          carData.NumberOfHours * carData.NumberOfCars * carData.RatePerHour;
      }
    }
    this.TotalBill = totalHoursBill + totalDaysBill;
  }

  ClearForm() {
    this.BookedCars = [];
    this.Hours = null;
    this.Days = null;
    this.noOfCars = null;
    this.selectedCar = '';
    this.duration = '';
    this.TotalBill = 0;
  }
}

export interface Car {
  Name: String;
  RatePerHour: number | null;
  RatePerDay: number | null;
}

export interface BookedCar {
  Name: String;
  NumberOfHours: number | null;
  NumberOfDays: number | null;
  RatePerHour: number | null;
  RatePerDay: number | null;
  NumberOfCars: number | null;
}
