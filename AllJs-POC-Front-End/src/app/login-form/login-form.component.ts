import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../userClass';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
	loginForm: FormGroup;

  constructor(private router: Router) { }

  users: User[];

  ngOnInit(){
  	this.loginForm = new FormGroup({
          username: new FormControl(''),
          password: new FormControl('')
    });
  }

  onSubmit(){
    console.log(this.loginForm.value);
  }



}
