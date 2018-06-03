import { Component, OnInit } from '@angular/core';
import { logging } from 'protractor';

@Component({
  selector: 'app-dashboardd',
  templateUrl: './dashboardd.component.html',
  styleUrls: ['./dashboardd.component.css']
})
export class DashboarddComponent implements OnInit {
  ShowProductKeen = true;
  ShowProductVwash = false;

  constructor() { }
  user: any
  ngOnInit() {
    this.user = 'เข้าสู่ระบบ';
    this.ShowProductKeen = true;
    if (sessionStorage.getItem('authen')) {
      this.user = JSON.parse(sessionStorage.getItem('user'));
      console.log(this.user + ' logging...');
    };
  }

  logout() {
    if (sessionStorage.getItem('authen')) {
      (this.user ? this.user : this.user = '')
      console.log(this.user + ' logout...');
      sessionStorage.removeItem('authen');
      sessionStorage.removeItem('user');
      this.user = '*';
    }
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
