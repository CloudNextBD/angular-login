import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions, URLSearchParams} from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
    public token: string;
    public serverUrl:string = 'http://localhost:8080/loginauth';
    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        console.log("currentUser:" + currentUser);
    }

    login(username, password): Observable<boolean> {
        //let params = 'json=' + body;
        let params = new URLSearchParams();
        params.set('action', 'opensearch');
        params.set('format', 'json');
        params.set('callback', 'JSONP_CALLBACK');
        let headers = new Headers({
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers' : 'Access-Control-Allow-Headers, Origin,Accept,Authorization,' +
            'Access-Control-Allow-Origin,Content-Type',
            'Accept' : 'application/json',
            'Content-Type': 'application/json',

        });

        let body = JSON.stringify({"username":username,"password":password});
        let options = new RequestOptions({headers:headers,method:"post"});

        return this.http.post(this.serverUrl, body, options).map(this.extractData);

        // return this.http.post('http://localhost:8080/loginauth', JSON.stringify({ username: username, password: password
        // }), options).map((response: Response) => {
        //
        //         // login successful if there's a jwt token in the response
        //         let token = response.json() && response.json().token;
        //         console.log("response:" + response.json().token);
        //         console.log(username +" "+password);
        //         console.log("server token:" + token);
        //         console.log("browser token:" + this.token);
        //         if (token) {
        //             // set token property
        //             this.token = token;
        //
        //             // store username and jwt token in local storage to keep user logged in between page refreshes
        //             localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
        //
        //             // return true to indicate successful login
        //             return true;
        //         } else {
        //             // return false to indicate failed login
        //             return false;
        //         }
        //     });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    private handleError (error: Response) {
        console.error(Response + " " + error);
        return Observable.throw(error.json().error || ' error');
    }
    private handleErrorAny (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    private extractData(res: Response) {
        let body;

        // check if empty, before call json
        if (res.text()) {
            body = res.json();
        }
        console.log(body);
        return body || {};
    }
}