import {Component, OnInit} from '@angular/core';
import {DataProviderService} from '../../services/data-provider.service';
import {ChartType} from 'chart.js';
import {MatDialog} from '@angular/material';
import {DiaryAddComponent} from '../diary-add/diary-add.component';
import {IngredientCreationComponent} from '../ingredient-creation/ingredient-creation.component';

@Component({
	selector: 'app-nutrition-summary-dash',
	templateUrl: './nutrition-summary-dash.component.html',
	styleUrls: ['./nutrition-summary-dash.component.scss']
})
export class NutritionSummaryDashComponent implements OnInit {

	nutritionData: any | undefined;
	public pieChartLabels = ['Protein', 'Fat', 'Carbohydrates'];
	public pieChartData;
	public pieChartType: ChartType = 'doughnut';
	public pieChartLegend = false;
	public pieChartOptions = {
		maintainAspectRatio: false,
		tooltips: {
			enabled: true
		}
	};

	constructor(private dataProvider: DataProviderService, public dialog: MatDialog) {
	}

	ngOnInit() {
		this.updateData();
	}

	updateData() {
		return this.dataProvider.getTodayData()
		.subscribe((data) => {
			this.nutritionData = data;
			this.pieChartData = [
				this.nutritionData.calorieData.macros.protein,
				this.nutritionData.calorieData.macros.fat,
				this.nutritionData.calorieData.macros.carbohydrates
			];
		});
	}

	openMealDialog() {
		const dialogRef = this.dialog.open(DiaryAddComponent, {
			panelClass: ['add-food-dialog', 'mat-elevation-z8'],
			maxHeight: '90vh'
		});
	}

	openIngredientCreationDialog() {
		const dialogRef = this.dialog.open(IngredientCreationComponent, {
			// panelClass: ['mat-elevation-z8'],
			// height: '90vh'
		});
	}

	addExercise() {
	}

	addBiometric() {
	}

	getRemainingCalories() {
		return this.nutritionData.calorieData.goal - this.nutritionData.calorieData.eaten + this.nutritionData.calorieData.burned;
	}

	getGoalPercent() {
		return 100 - this.getRemainingCalories() / this.nutritionData.calorieData.goal * 100;
	}
}
