import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dataService: DataService) { }
  data: any = {}
  users: any
  ngOnInit() {
    this.data = {
      user: 'user',
      pwd: '123456'
    };
  }

  submit() {
    this._dataService.Insert(this.data).subscribe(response => {
      debugger
      var data = response.data;
        this.data.user = data[0].user;
        this.data.pwd = data[0].pwd;
    
    });
  }

}
