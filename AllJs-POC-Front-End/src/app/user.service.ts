import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
	base_path:string = 'http://localhost:9090/users';

  	constructor(
		  private http: HttpClient
		  ) { }

  	login(user) {
		return this.http.post(this.base_path + '/login', user);
	}
	  
  	signUp(user) {
		return this.http.post(this.base_path + '/signup', user);
  	}
}