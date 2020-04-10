import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Auth } from 'aws-amplify';
// tslint:disable-next-line: indent
@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
    form: FormGroup;
    errorOnSignUp = {
        error: false,
        errorPhrase: ''
	};
	constructor(
		private router: Router
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
		Auth.signUp({
			username,
			password,
			attributes: {
				email,
				phone_number,
			}
		})
		.then(data => {
			this.router.navigate(['/']);
		})
		.catch(err => {
			this.errorOnSignUp.error = true;
			this.errorOnSignUp.errorPhrase = err.message;
		});
	}
}
