import {Injectable} from '@angular/core';
import {ActualFood, Ingredient, PLACEHOLDER_BASKET, UNIT} from '../models/ingredient';

@Injectable({
	providedIn: 'root'
})
export class MealBasketService {

	basket: ActualFood[];
	localBasket: string | null;

	constructor() {
		this.localBasket = localStorage.getItem('basket');
		if (this.localBasket == null) {
			this.basket = PLACEHOLDER_BASKET;
			localStorage.setItem('basket', this.localBasket = JSON.stringify(this.basket));
		} else {
			this.basket = JSON.parse(this.localBasket);
		}
	}

	addToBasket(addIngredient: Ingredient, mealType: string, unit: UNIT, quantity: number, image?: string | ArrayBuffer) {
		// TODO check if the item was already added
		const newIngredient: ActualFood = {
			foodName: addIngredient.description,
			mealType,
			quantity: {
				referenceUnit: unit,
				referenceQuantity: quantity
			},
			foodPicture: image || addIngredient.image
		};
		this.basket.push(newIngredient);
		localStorage.setItem('basket', this.localBasket = JSON.stringify(this.basket));
	}

	removeItemFromBasket(foodToRemove: ActualFood) {
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
