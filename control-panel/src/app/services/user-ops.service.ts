import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UserOpsService {

	authKey: string | null;

	constructor(private http: HttpClient) {
	}

	registerUser(user: any) {
		return this.http.post('/users/register', user);
	}

	logUser(user: any) {
		return this.http.post('/users/login', user);
	}

	storeLoginSession(jwtToken: string) {
		localStorage.setItem('authKey', jwtToken);
	}

	getMeals() {
		return this.http.get('/dashboard/meals', {
			headers: {Authorization: this.loadSessionToken()}
		});
	}

	clearLoginSession() {
		localStorage.removeItem('authKey');
	}

	loadSessionToken() {
		return localStorage.getItem('authKey');
	}
}
