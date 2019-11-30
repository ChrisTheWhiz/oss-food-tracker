import {Component, OnInit} from '@angular/core';
import {MealBasketService} from '../../services/meal-basket.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ConversionsUtil} from '../../utils/conversions.util';
import {UNIT} from '../../../../../shared_code/shared-enums';
import {Meal} from '../../../../../shared_code/shared-interfaces';

@Component({
	selector: 'app-basket',
	templateUrl: './basket.component.html',
	styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
	basket: Meal[];
	UNIT = UNIT;

	constructor(
		private basketService: MealBasketService,
		private conversions: ConversionsUtil) {
	}

	ngOnInit() {
		this.basket = this.basketService.getBasket();
	}

	removeItemFromBasket(item: Meal) {
		this.basketService.removeItemFromBasket(item);
	}
}
