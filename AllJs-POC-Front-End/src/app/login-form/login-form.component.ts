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
  errorOnLogin = {
    error: false,
    errorPhrase: ''
  };

  constructor(
    private router: Router,
    private userService: UserService
    ) { }

  ngOnInit(){
  	this.loginForm = new FormGroup({
          username: new FormControl(''),
          password: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const user = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };
    this.userService.login(user)
      .subscribe((res) => {
        console.log(res);
        this.errorOnLogin.error = false;
        this.errorOnLogin.errorPhrase = '';
      },
      (err) => {
        this.errorOnLogin.error = true;
        this.errorOnLogin.errorPhrase = err.error.errorMessage;
      });
  }
}
