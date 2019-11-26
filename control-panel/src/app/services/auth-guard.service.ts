import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

// import { AuthenticationService } from '@app/_services';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const currentUser = this.authService.currentUserValue;
		if (currentUser) {
			return true;
		} else {
			this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}})
			.catch((e) => {
				console.log('error sending prospector back to login:');
				console.log(e);
				throw e;
			});
		}
	}

}
