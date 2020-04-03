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
	newUsers : NewUser[];

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

  	onSubmit(){
  		console.log(this.form.value)
  		//this.newUsers.push(new NewUser(this.form.get('fistname'),this.form.get('lastname'),this.form.get('birthDate'),this.form.get('username'),this.form.get('password'),this.form.get('remember')));
  	}

}
