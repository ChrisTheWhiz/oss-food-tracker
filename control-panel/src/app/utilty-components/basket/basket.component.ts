import {Component, OnInit} from '@angular/core';
import {MealBasketService} from '../../services/meal-basket.service';
import {ConversionsUtil} from '../../utils/conversions.util';
import {UNIT} from '../../../../../shared_code/shared-enums';
import {FoodInstance, Ingredient, Meal} from '../../../../../shared_code/shared-interfaces';
import {IngredientsService} from '../../services/ingredients.service';

@Component({
	selector: 'app-basket',
	templateUrl: './basket.component.html',
	styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
	basket: FoodInstance[];
	UNIT = UNIT;

	constructor(
		private basketService: MealBasketService,
		private conversions: ConversionsUtil,
		public ingredientService: IngredientsService
		) {
	}

	ngOnInit() {
		this.basket = this.basketService.getBasket();
	}

	removeItemFromBasket(item: FoodInstance) {
		this.basketService.removeItemFromBasket(item);
	}
}
