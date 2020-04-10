import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../userClass';
import { UserService } from '../user.service';

import { Auth } from 'aws-amplify';
// tslint:disable-next-line: indent
@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
    form: FormGroup;
    newUser: NewUser;
    errorOnSignUp = {
        error: false,
        errorPhrase: ''
	};
	constructor(
		private router: Router,
		private userService: UserService
	) { }

	ngOnInit() {
		this.form = new FormGroup({
			email: new FormControl(''),
			phone: new FormControl(''),
			username: new FormControl(''),
			password: new FormControl('')
		});
	}

	async onSubmit() {
		let email = this.form.value.email;
		let phone_number = this.form.value.phone;
		let username = this.form.value.username;
		let password = this.form.value.password;
		console.log(username);
		Auth.signUp({
			username,
			password,
			attributes: {
				email,          // optional
				phone_number,   // optional - E.164 number convention
				// other custom attributes
			},
			validationData: []  // optional
		})
			.then(data => { 
				console.log(data);
				this.router.navigate(['/']);
			})
			.catch(err => {
				console.log(err);
				this.errorOnSignUp.error = true;
				this.errorOnSignUp.errorPhrase = err.message;
			});
		console.log(this.form.value);
	}
}
