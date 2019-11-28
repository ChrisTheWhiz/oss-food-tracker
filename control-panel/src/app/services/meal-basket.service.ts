import {Injectable} from '@angular/core';
import {PersonalMeal, Ingredient, PLACEHOLDER_BASKET, UNIT} from '../models/ingredient';

@Injectable({
	providedIn: 'root'
})
export class MealBasketService {

	basket: PersonalMeal[];
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

	addToBasket(addIngredient: Ingredient, mealType?: string, unit?: UNIT, quantity?: number, image?: string | ArrayBuffer) {
		// TODO check if the item was already added
		const newIngredient: any = {
			description: addIngredient.description,
			kind: mealType,
			quantity: {
				referenceUnit: unit,
				referenceQuantity: quantity
			},
			picture: image || addIngredient.image
		};
		this.basket.push(newIngredient);
		localStorage.setItem('basket', this.localBasket = JSON.stringify(this.basket));
	}

	removeItemFromBasket(foodToRemove: PersonalMeal) {
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
