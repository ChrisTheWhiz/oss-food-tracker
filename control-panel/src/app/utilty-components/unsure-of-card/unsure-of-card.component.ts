import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-unsure-of-card',
	templateUrl: './unsure-of-card.component.html',
	styleUrls: ['./unsure-of-card.component.scss']
})
export class UnsureOfCardComponent implements OnInit {

	status: any;

	constructor(private httpClient: HttpClient) {
	}

	ngOnInit() {
	}

	getUserPersonalMeals() {
		return this.httpClient.get('dashboard/meals')
		.subscribe((response) => {
			console.log(response);
		});
	}
}
