import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {createMealModel, QuestionModel} from './create-meal.model';
import {HttpClient} from '@angular/common/http';
import {FoodInstance, Meal, MealInstance} from '../../../../../shared_code/shared-interfaces';
import {IngredientsService} from '../../services/ingredients.service';
import {Ng2ImgMaxService} from 'ng2-img-max';
import {DomSanitizer} from '@angular/platform-browser';
import {MealService} from '../../services/meal.service';

@Component({
	selector: 'app-create-meal',
	templateUrl: './create-meal.component.html',
	styleUrls: ['./create-meal.component.scss']
})
export class CreateMealComponent implements OnInit {
	formModel: QuestionModel[];
	mealForm: FormGroup;
	base64img: string | ArrayBuffer;

	ingredientsArr: MealInstance[] = [];

	constructor(
		private fb: FormBuilder,
		private httpClient: HttpClient,
		public ingredientService: IngredientsService,
		private ng2ImgMax: Ng2ImgMaxService,
		private sanitizer: DomSanitizer,
		private mealService: MealService) {
	}

	ngOnInit() {
		this.formModel = createMealModel.filter((question) => {
			return !['checkbox', 'custom', 'select', 'file'].includes(question.inputType);
		});
		const controls = [];
		this.formModel.forEach((question: QuestionModel) => {
			controls[question.key] = new FormControl(question.value, question.validators);
		});
		this.mealForm = this.fb.group(controls);
		this.mealForm.addControl('favourite', new FormControl(''));
		this.mealForm.addControl('ingredients', this.fb.array([]));
		this.mealForm.addControl('kind', new FormControl('recipe'));
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
		const meal: Meal = {
			description: this.mealForm.controls.description.value,
			kind: this.mealForm.controls.kind.value,
			ingredients: this.ingredientsArr,
			image: this.base64img
		};
		this.mealService.createMeal(meal)
			.subscribe((resp) => {
				console.log(resp);
			});
	}

	get ingredients() {
		return this.mealForm.controls.ingredients as FormArray;
	}

	addIngredient(item: FoodInstance) {
		this.ingredientService.localGetIngredient(item.food)
			.subscribe((ingredient) => {
				this.ingredientsArr.push({
					ingredient,
					quantity: item.quantity
				});
			});
	}

	onImageChange(event) {
		// console.log('image event triggered!');
		const image = event.target.files[0];
		const reader: FileReader = new FileReader();
		this.ng2ImgMax.resizeImage(image, 2000, 100).subscribe(
			result => {
				reader.readAsDataURL(result);
				// @ts-ignore
				reader.onload = () => {
					if (reader.result) {
						this.base64img = reader.result;
					} else {
						throw new Error('Reading new ingredient image failed in ingredient-creation.components.ts');
					}
				};

			},
			error => {
				console.log('😢 Oh no!', error);
			}
		);
	}

}
