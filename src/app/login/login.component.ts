import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _dataService: DataService) {
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
    this._dataService.Login(this.Fdata).subscribe(response => {
      var data = JSON.parse(response['_body']);
      if (data.success) {
        console.log('login Success');
        this.datatest = data.token;
      }
    });
  }



}
