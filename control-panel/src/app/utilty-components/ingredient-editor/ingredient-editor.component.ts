import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MealBasketService} from '../../services/meal-basket.service';
import {ConversionsUtil} from '../../utils/conversions.util';
import {UNIT} from '../../../../../shared_code/shared-enums';
import {FoodInstance, Ingredient} from '../../../../../shared_code/shared-interfaces';
import {AuthService} from '../../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
	selector: 'app-ingredient-editor',
	templateUrl: './ingredient-editor.component.html',
	styleUrls: ['./ingredient-editor.component.scss']
})
export class IngredientEditorComponent implements OnInit {

	@Output() itemAdded = new EventEmitter<FoodInstance>();
	@Input() ingredient: Ingredient;
	@Input() showMealField: boolean;

	pieChartConfig = {
		pieChartLabels: ['Protein', 'Fat', 'Carbohydrates'],
		pieChartType: 'doughnut',
		pieChartLegend: false,
		pieChartData: [0, 0, 0]
	};

	// We use a non-null assertion here because this component cannot be accesed without being logged in
	mealTimes = this.authService.currentUserValue!.mealTimes;

	form: FormGroup;
	meal: string;
	servingType: UNIT;
	quantity: number;
	image: string | ArrayBuffer | undefined;

	constructor(private conversions: ConversionsUtil, private basketService: MealBasketService, private authService: AuthService) {
	}

	ngOnInit() {
		this.form = new FormGroup({
			quantity: new FormControl(''),
			unit: new FormControl(this.UNIT[0])
		});
		if (this.showMealField) {
			this.form.addControl('mealTime', new FormControl(this.mealTimes[0]));
		}
		// @ts-ignore
		this.pieChartConfig.pieChartData = this.calculatePercentages(this.ingredient.nutrition[0].amount, this.ingredient.nutrition[1].amount, this.ingredient.nutrition[2].amount);
	}

	// TODO make this more readable
	calculatePercentages(gramsOfProtein: number, gramsOfFat: number, gramsOfCarbo: number): [number, number, number] {
		const sum = gramsOfProtein + gramsOfFat + gramsOfCarbo;
		return [Math.round(gramsOfProtein / sum * 100), Math.round(gramsOfFat / sum * 100), Math.round(gramsOfCarbo / sum * 100)];
	}

	passIngredientUpwards() {
		this.itemAdded.emit({
			foodType: 'Ingredient',
			quantity: this.conversions.convertQuantityToGrams(this.form.controls.quantity.value, this.form.controls.unit.value),
			timeOfConsumption: new Date(),
			mealTime: this.form.controls.mealTime ? this.form.controls.mealTime.value : 'N/A',
			food: this.ingredient._id!
		});
	}

	get UNIT() {
		return Object.keys(UNIT);
	}
}
