import {Injectable} from '@angular/core';
import {Meal} from '../../../../shared_code/shared-interfaces';
import {HttpClient} from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MealService {

	constructor(public httpClient: HttpClient) {
	}

	getMeals() {

	}

	createMeal(meal: Meal) {
		return this.httpClient.post('/dashboard/meal', {
			meal
		});
	}
}
