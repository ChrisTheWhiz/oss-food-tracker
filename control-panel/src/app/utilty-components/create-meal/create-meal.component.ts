import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {createMealModel} from './create-meal.model';
import {QuestionModel} from './create-meal.model';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-create-meal',
	templateUrl: './create-meal.component.html',
	styleUrls: ['./create-meal.component.scss']
})
export class CreateMealComponent implements OnInit {
	formModel: QuestionModel[];
	mealForm: FormGroup;
	ingredientsArr: any[] = [];

	constructor(
		private fb: FormBuilder,
		private httpClient: HttpClient) {
	}

	ngOnInit() {
		this.formModel = createMealModel.filter((question) => {
			return !['checkbox', 'custom', 'file'].includes(question.inputType);
		});
		const controls = [];
		this.formModel.forEach((question: QuestionModel) => {
			controls[question.key] = new FormControl(question.value, question.validators);
		});
		this.mealForm = this.fb.group(controls);
		this.mealForm.addControl('favourite', new FormControl(''));
		this.mealForm.addControl('ingredients', this.fb.array([]));
	}

	getControlError(controlName: string): string | null {
		const errors = this.mealForm.controls[controlName].errors;
		if (errors) {
			return Object.keys(errors)[0];
		} else {
			return null;
		}
	}

	onSubmit() {
		// console.log(this.mealForm.value);
		// this.mealForm.reset();
		this.httpClient.post('/dashboard/meal', {
			meals: {
				...this.mealForm.value,
				ingredients: this.ingredientsArr
			}
		})
		.subscribe((resp) => {
			console.log(resp);
		});
	}

	get ingredients() {
		return this.mealForm.controls.ingredients as FormArray;
	}

	addIngredient(item) {
		// item = [this.ingredientInstance, this.meal, this.servingType, this.quantity, this.image];
		this.ingredientsArr.push({
			ingredientInstance: item[0],
			servingType: item[2],
			quantity: item[3]
		});
		console.log(this.ingredientsArr);
	}
}
