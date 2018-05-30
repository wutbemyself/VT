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
  ngOnInit() {
    this.Fdata = {
      user: 'user',
      pwd: '123456'
    };
  }

  submit() {
    this._dataService.Insert(this.Fdata).subscribe(response => {
      debugger
      var data = response.data;
      this.Fdata.user = data[0].user;
      this.Fdata.pwd = data[0].pwd;

    });
  }



}
