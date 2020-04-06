import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	loginForm: FormGroup;

  constructor(
    private router: Router,
    private userService
    ) { }

  ngOnInit(){
  	this.loginForm = new FormGroup({
          username: new FormControl(''),
          password: new FormControl('')
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
    let user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }
    let loggedinUser = this.userService.login(user);
    console.log(loggedinUser);
  }
}