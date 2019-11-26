import {Component} from '@angular/core';
import {FORM_MODE} from './utilty-components/user-sign/user-sign.model';
import {AuthService} from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(public authService: AuthService) {
	}

	title = 'control-panel';

}
