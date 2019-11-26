import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, pipe} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

interface User {
	id: string; // TODO make this a proper ObjectId
	name: string;
	username: string;
	email: string;
	password: string;
	jwt?: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private httpClient: HttpClient) {
		if (JSON.parse(localStorage.getItem('currentUser')) == null) {
			// throw new Error('No current user when trying to parse JSON in auth.service.ts');
		}
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	login(username: string, password: string) {
		return this.httpClient.post<any>('/users/login', {usernameOrEmail: username, password})
		.pipe(
			map((response: {status: string, token: string, user: User}) => {
				console.log(response);
				const user: User = response.user;
				localStorage.setItem('currentUser', JSON.stringify(user));
				this.currentUserSubject.next(user);
				return user;
			})
		);
	}

	logout() {
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}

	register(newUser: User) {
		return this.httpClient.post('/users/register', newUser)
		.pipe(
			map((response: {status: string, user: User}) => {
				const {status, user} = response;
				localStorage.setItem('currentUser', JSON.stringify(user));
				return status;
			})
		);
	}
}

