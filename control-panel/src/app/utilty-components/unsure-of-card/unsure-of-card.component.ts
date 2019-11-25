import {Component, OnInit} from '@angular/core';
import {UserOpsService} from '../../services/user-ops.service';

@Component({
	selector: 'app-unsure-of-card',
	templateUrl: './unsure-of-card.component.html',
	styleUrls: ['./unsure-of-card.component.scss']
})
export class UnsureOfCardComponent implements OnInit {

	status: any;

	constructor(public userOps: UserOpsService) {
	}

	ngOnInit() {
	}

	getMeals() {
		this.userOps.getMeals()
		.subscribe((res) => {
			this.status = res;
		});
	}

	debug_logout() {
		this.userOps.clearLoginSession();
	}
}
