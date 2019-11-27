import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

	constructor(private authService: AuthService) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req)
		.pipe(catchError((err: HttpErrorResponse) => {
			if (err.status === 401) {
				this.authService.logout();
				location.reload();
			}

			const error = err.error.message;
			return throwError(error);
		}));
	}
}
