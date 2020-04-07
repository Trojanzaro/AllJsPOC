import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../userClass';
import { UserService } from '../user.service';

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
			firstname: new FormControl(''),
			lastname: new FormControl(''),
			birthDate: new FormControl(''),
			username: new FormControl(''),
			password: new FormControl(''),
			remember: new FormControl('')
		});
	}

	onSubmit() {
		const user = {
			firstname: this.form.value.username,
			lastname: this.form.value.lastname,
			birthDate: this.form.value.birthDate,
			username: this.form.value.username,
			password: this.form.value.password,
			remember: this.form.value.remember,
		}
		this.userService.signUp(user)
			.subscribe((data) => {
				this.router.navigate(['/']);
			},
			(err) => {
				this.errorOnSignUp.error = true;
				this.errorOnSignUp.errorPhrase = err.error.errorMessage;
			})
		console.log(this.form.value);
	}
}
