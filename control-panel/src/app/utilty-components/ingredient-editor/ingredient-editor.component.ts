import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ingredient, UNIT} from '../../models/ingredient';
import {ChartType} from 'chart.js';
import {DomSanitizer} from '@angular/platform-browser';
import {MealBasketService} from '../../services/meal-basket.service';
import {ConversionsUtil} from '../../utils/conversions.util';

@Component({
	selector: 'app-ingredient-editor',
	templateUrl: './ingredient-editor.component.html',
	styleUrls: ['./ingredient-editor.component.scss']
})
export class IngredientEditorComponent implements OnInit {
	@Output() itemAdded = new EventEmitter<string>();
	@Input() ingredientInstance: Ingredient;

	public pieChartLabels = ['Protein', 'Fat', 'Carbohydrates'];
	public pieChartData: [number, number, number];
	public pieChartType: ChartType = 'doughnut';
	public pieChartLegend = false;

	meal: string;
	servingType: UNIT;
	quantity: number;
	image: string | ArrayBuffer | undefined;

	constructor(private conversions: ConversionsUtil, private basketService: MealBasketService) {

	}

	ngOnInit() {
		this.pieChartData = this.calculatePercentages(this.ingredientInstance.nutrition[0].amount, this.ingredientInstance.nutrition[1].amount, this.ingredientInstance.nutrition[2].amount);
	}

	calculatePercentages(gramsOfProtein: number, gramsOfFat: number, gramsOfCarbo: number): [number, number, number] {
		const sum = gramsOfProtein + gramsOfFat + gramsOfCarbo;
		return [Math.round(gramsOfProtein / sum * 100), Math.round(gramsOfFat / sum * 100), Math.round(gramsOfCarbo / sum * 100)];
	}

	addIngredientToBasket() {
		this.itemAdded.emit('ingredient_added_placeholder_description');
		this.basketService.addToBasket(this.ingredientInstance, this.meal, this.servingType, this.quantity, this.image);
	}

	getRandomNumber() {
		return Math.floor(Math.random() * 12);
	}
}
