import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import Amplify, { API } from 'aws-amplify';

import { AmplifyService }  from 'aws-amplify-angular';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  user = null;
  loggedIn = false;
  errorOnLogin = {
    error: false,
    errorPhrase: ''
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private amplifyService: AmplifyService
  ) { }

  ngOnInit() {
    if (this.user === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  async onSubmit() {
    let response = await this.getData(this.loginForm.value.username);
    console.log(response);
    // console.log(this.loginForm.value);
    // const user = {
    //   username: this.loginForm.value.username,
    //   password: this.loginForm.value.password
    // };
    // this.userService.login(user)
    //   .subscribe((res) => {
    //     console.log(res);
    //     this.user = res;
    //     this.loggedIn = true;
    //     this.errorOnLogin.error = false;
    //     this.errorOnLogin.errorPhrase = '';
    //   },
    //     (err) => {
    //       this.errorOnLogin.error = true;
    //       this.errorOnLogin.errorPhrase = err.error.errorMessage;
    //     });
  }

  signOut() {
    this.user = null;
    this.loggedIn = false;
  }

  async getData(id) {
    let apiName = 'dev-my-first-service';
    let path = '/hello/' + id;
    return await API.get(apiName, path, null);
  }
}
