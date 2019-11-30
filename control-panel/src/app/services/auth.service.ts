import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../../../shared_code/shared-interfaces';

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
					// console.log(response.user);
					if (response.user) {
						response.user.jwt = response.token;
						localStorage.setItem('currentUser', JSON.stringify(response.user));
						this.currentUserSubject.next(response.user);
						this.createBeenLoggedEntryInLocalStorage();
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
				map((response: { status: string, token: string, user: User, message: Array<{ msg: string }> }) => {
					if (response.status !== 'success') {
						// console.log(response);
						return response;
					} else {
						response.user.jwt = response.token;
						localStorage.setItem('currentUser', JSON.stringify(response.user));
						this.currentUserSubject.next(response.user);
						this.createBeenLoggedEntryInLocalStorage();
						return response;
					}
				})
			);
	}

	createBeenLoggedEntryInLocalStorage() {
		const beenLogged = localStorage.getItem('beenLogged');
		if (!beenLogged) {
			localStorage.setItem('beenLogged', 'true');
		}
	}

	checkIfHasBeenLogged(): boolean {
		const beenLogged = localStorage.getItem('beenLogged');
		return beenLogged === 'true';
	}
}

