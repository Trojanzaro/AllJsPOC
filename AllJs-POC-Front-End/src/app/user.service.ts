import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

	mock: boolean = true;
	base_path:string = 'http://localhost:9090/user/login';

  	constructor(
		  private http: HttpClient,
		  private httpParams: HttpParams
		  ) { }

  	login (user){
		return this.http.post(this.base_path, user);
  	}
}