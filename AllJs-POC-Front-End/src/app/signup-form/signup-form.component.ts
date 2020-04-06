import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { NewUser} from '../userClass';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
	form: FormGroup;
	newUser : NewUser;

  	constructor() { }

  	ngOnInit() {
  		this.form = new FormGroup({
  			firstname: new FormControl(''),
  			lastname: new FormControl(''),
  			birthDate: new FormControl(''),
  			username: new FormControl(''),
  			password: new FormControl(''),
  			remember: new FormControl('')
  		});
  	}

  	onSubmit() {
  		console.log(this.form.value)
  	}
}
