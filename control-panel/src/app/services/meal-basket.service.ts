import {Injectable} from '@angular/core';
import {FoodInstance} from '../../../../shared_code/shared-interfaces';

@Injectable({
	providedIn: 'root'
})
export class MealBasketService {

	basket: FoodInstance[];
	localBasket: string | null;

	constructor() {
		this.localBasket = localStorage.getItem('basket');
		if (this.localBasket == null) {
			this.basket = [];
			localStorage.setItem('basket', this.localBasket = JSON.stringify(this.basket));
		} else {
			this.basket = JSON.parse(this.localBasket);
		}
	}

	addToBasket(food: FoodInstance) {
		// TODO check if the item was already added
		this.basket.push(food);
		localStorage.setItem('basket', this.localBasket = JSON.stringify(this.basket));
	}

	removeItemFromBasket(foodToRemove: FoodInstance) {
		this.basket.splice(this.basket.indexOf(foodToRemove), 1);
		localStorage.setItem('basket', this.localBasket = JSON.stringify(this.basket));
	}

	getBasket() {
		return this.basket;
	}

	uploadBasket() {
		this.emptyBasket();
		localStorage.removeItem('basket');
	}

	private emptyBasket() {
		this.basket = [];
		localStorage.removeItem('basket');
	}
}
