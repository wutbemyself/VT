import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private _dataService: DataService, public router: Router) {
  }
  Fdata: any = {}
  users: any
  datatest = '';
  ngOnInit() {
    this.Fdata = {
      user: 'user',
      pwd: '123456'
    };
  }

  submit() {
    this._dataService.Register(this.Fdata).subscribe(response => {
      var data = JSON.parse(response);
      if (data.status == 200) {
        this.datatest = data.resultCode;
        // this.router.navigate(['login']);
      }
    });
  }
}
