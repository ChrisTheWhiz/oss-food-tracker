import {Component, OnInit} from '@angular/core';
import {ChartType} from 'chart.js';
import {FormControl} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {MealBasketService} from '../../services/meal-basket.service';

@Component({
	selector: 'app-diary-add',
	templateUrl: './diary-add.component.html',
	styleUrls: ['./diary-add.component.scss']
})
export class DiaryAddComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<DiaryAddComponent>,
		public  basketService: MealBasketService) {
	}

	ngOnInit() {
	}

	search() {
	}

	closeDialog() {
		this.basketService.uploadBasket();
		this.dialogRef.close();
	}
}
