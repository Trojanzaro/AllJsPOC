import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { API, Auth } from 'aws-amplify';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  verifyForm: FormGroup;
  user = null;
  loggedIn = false;
  loading = false;
  userNotConfirmed = {
    username: '',
    unconfirmed: false
  };
  errorOnLogin = {
    error: false,
    errorPhrase: ''
  };

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    Auth.currentSession()
      .then((data) => {
        if (data !== undefined) {
          this.user = data;
          this.loggedIn = true;
        }
      })
      .catch((err) => console.log(err));
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    this.verifyForm = new FormGroup({
      verifyCode: new FormControl('')
    });
  }

  async onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    try {
      this.loading = true;
      const user = await Auth.signIn(username, password);
      this.loading = false;
      if (user.challengeName === 'SMS_MFA' ||
          user.challengeName === 'SOFTWARE_TOKEN_MFA') {
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
      } else if (user.challengeName === 'MFA_SETUP') {
      } else {
          this.errorOnLogin.errorPhrase = '';
          this.errorOnLogin.error = false;
          this.user = user;
          this.loggedIn = true;
      }
  } catch (err) {
      this.loading = false;
      if (err.code === 'UserNotConfirmedException') {
        this.userNotConfirmed.unconfirmed = true;
        this.userNotConfirmed.username = username;
      } else if (err.code === 'PasswordResetRequiredException') {
      } else {
        this.errorOnLogin.error = true;
        this.errorOnLogin.errorPhrase = err.message;
      }
  }
  }

  confirmUser() {
    const verifyCode = this.verifyForm.value.verifyCode;
    Auth.confirmSignUp(this.userNotConfirmed.username, verifyCode)
      .then(() => this.userNotConfirmed.unconfirmed = false)
      .catch((err) => {
        this.errorOnLogin.error = true;
        this.errorOnLogin.errorPhrase = err.message;
      });
  }

  resendVerifyCode() {
    Auth.resendSignUp(this.userNotConfirmed.username).then(() => {
      console.log('code resent successfully');
  }).catch(e => {
      console.log(e);
  });
  }

  signOut() {
    Auth.signOut()
    .then(() =>  {
      this.user = null;
      this.loggedIn = false;
    })
    .catch((err) => console.log(err));
  }


  async getData(id) {
    const apiName = 'dev-my-first-service';
    const path = '/users/' + id;
    const data = await API.get(apiName, path, null);
    console.log(data);
  }
}
