import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { Student } from '../models/student';
// import { Observable, throwError } from 'rxjs';
import { retry, catchError, timeout, map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout'

@Injectable()
export class PostProvider {
	//server: string = "http://192.168.0.32/server_api/"; // default

		server: string = "http://localhost/elibrary/server_api/";
	// if you test in real device "http://localhost" change use the your IP	
    // server: string = "http://192.199.122.100/IONIC4_CRUD_LOGINREGIS_PHP_MYSQL/server_api/"; 

	constructor(public http : HttpClient) {
				
	}

	postData(body:any, file:any){
		let httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json; charset=UTF-8'
			})
		}

		return this.http.post(this.server + file, JSON.stringify(body), httpOptions).timeout(59000).map(res=>res);
     
	}
}