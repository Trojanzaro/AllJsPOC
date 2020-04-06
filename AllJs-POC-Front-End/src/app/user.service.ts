import { Injectable } from '@angular/core';
import { User} from './userClass';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	mock: boolean = true;
	base_path:string = 'localhost';

  	constructor(private http: HttpClient) { }

  	getUsers () : Observable<User[]> {
  		if (this.mock){
  			return of(USERS_LIST);
  		}else {
  			return this.http.get<User[]>(this.base_path+'/login-form');
  		}
  	}
}

export const USERS_LIST = 
	[ 
		{
			username: 'maria',
			password: 'maria'
		}
	]