import {Component, OnInit} from '@angular/core';
import {ChartType} from 'chart.js';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {MealBasketService} from '../../services/meal-basket.service';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-diary-add',
	templateUrl: './diary-add.component.html',
	styleUrls: ['./diary-add.component.scss']
})
export class DiaryAddComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<DiaryAddComponent>,
		public  basketService: MealBasketService,
		public httpClient: HttpClient // TODO move this to the appropriate service
	) {
	}

	ngOnInit() {
	}

	search() {
	}

	closeDialog() {
		this.basketService.uploadBasket();
		this.dialogRef.close();
	}

	addMealsToHistory() {
		const basket = this.basketService.getBasket();
		// @ts-ignore
		this.httpClient.post('/dashboard/meals', {meals: basket})
		.subscribe((resp) => {
			console.log(resp);
		})

		this.closeDialog();
	}
}
