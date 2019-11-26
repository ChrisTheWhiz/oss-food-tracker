import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
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

	private currentUserSubject: BehaviorSubject<User | null>;
	public currentUser: Observable<User | null>;

	constructor(private httpClient: HttpClient) {
		const localUser = localStorage.getItem('currentUser');
		if (localUser === 'undefined' || localUser === 'null' || localUser == null) {
			localStorage.removeItem('currentUser');
			this.currentUserSubject = new BehaviorSubject<User | null>(null);
			this.currentUser = this.currentUserSubject.asObservable();
		} else if (localUser) {
			this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localUser));
			this.currentUser = this.currentUserSubject.asObservable();
		}
	}

	public get currentUserValue(): User | null {
		return this.currentUserSubject.value;
	}

	login(username: string, password: string) {
		return this.httpClient.post<any>('/users/login', {usernameOrEmail: username, password})
		.pipe(
			map((response: { status: string, token?: string, user?: User, message?: string }) => {
				if (response.user) {
					localStorage.setItem('currentUser', JSON.stringify(response.user));
					this.currentUserSubject.next(response.user);
				}
				return response;
			})
		);
	}

	logout() {
		localStorage.removeItem('currentUser');
		// Supressed because we need to push null to observers so they can be notified that we are not logged in anymore
		// @ts-ignore
		this.currentUserSubject.next(null);
	}

	register(newUser: User) {
		return this.httpClient.post('/users/register', newUser)
		.pipe(
			map((response: { status: string, user: User, message: Array<{ msg: string }> }) => {
				if (response.status !== 'success') {
					const newMessage = response.message.map((mess) => {
						return mess.msg;
					}).join(';');
					return {status: response.status, message: newMessage, user: response.user};
				} else {
					return response;
				}
			})
		);
	}
}

