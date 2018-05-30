import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardd',
  templateUrl: './dashboardd.component.html',
  styleUrls: ['./dashboardd.component.css']
})
export class DashboarddComponent implements OnInit {
  ShowProductKeen = true;
  ShowProductVwash = false;
  constructor() { }

  ngOnInit() {
    this.ShowProductKeen = true;
  }

  ShowProduct(PD) { 
    if (PD == 'VW') {
      this.ShowProductVwash = true;
      this.ShowProductKeen = false;
    } else {
      this.ShowProductKeen = true;
      this.ShowProductVwash = false;
    }

  }
}
