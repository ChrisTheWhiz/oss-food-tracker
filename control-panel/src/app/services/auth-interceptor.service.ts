import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

	constructor(private authService: AuthService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const currentUser = this.authService.currentUserValue;

		if (currentUser && currentUser.jwt) {
			req = req.clone({
				setHeaders: {
					Authorization: currentUser.jwt
				}
			});
		}
		return next.handle(req);
	}
}
