import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';

const dailyDashboard = {
	streak: {
		number: 5,
		unit: 'weeks'
	},
	calorieData: {
		goal: 1000,
		eaten: 500,
		burned: 300,
		macros: {
			protein: 20,
			fat: 30,
			carbohydrates: 50
		}
	}
};

@Injectable({
	providedIn: 'root'
})
export class DataProviderService {

	constructor() {
	}

	getTodayData(): Observable<any> {
		return of(dailyDashboard);
	}


}
