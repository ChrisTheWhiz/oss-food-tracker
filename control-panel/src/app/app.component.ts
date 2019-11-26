import {Component} from '@angular/core';
import {AuthService} from './services/auth.service';
import {MatDialog} from '@angular/material';
import {UserSignComponent} from './utilty-components/user-sign/user-sign.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(public authService: AuthService, public dialog: MatDialog) {
	}

	title = 'control-panel';

	openSigningModal() {
		const dialogRef = this.dialog.open(UserSignComponent, {
		});
}
}
