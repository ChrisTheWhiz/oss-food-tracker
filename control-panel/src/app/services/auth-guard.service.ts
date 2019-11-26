import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const currentUser = this.authService.currentUserValue;
		if (currentUser) {
			return true;
		} else {
			this.router.navigate([ {outlets: { modal: 'login' } } ])
			.catch((e) => {
				console.log('error sending prospector back to login:');
				console.log(e);
				throw e;
			});
			return false;
		}
	}

}
