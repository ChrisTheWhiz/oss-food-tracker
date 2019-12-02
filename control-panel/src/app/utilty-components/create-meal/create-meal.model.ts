import {ValidatorFn, Validators} from '@angular/forms';
import {Ingredient, SubstanceNutrition} from '../../../../../shared_code/shared-interfaces';


export interface QuestionModel {
	placeholder?: string;
	prefixIcon?: string;
	errorMessages?: string[] | { [key: string]: string };
	validators?: ValidatorFn[];
	options?: string[];
	value?: string;
	inputType: string;
	label: string;
	key: string;
}

export interface PersonalMeal {
	description: string;
	favourite: boolean;
	quantity: SubstanceNutrition;
	kind: string;
	picture?: string | ArrayBuffer;
	ingredients: Ingredient[];
}

export const createMealModel: QuestionModel[] = [
	{
		placeholder: 'Onion and cheese omelet',
		prefixIcon: 'fastfood',
		errorMessages: {required: 'No description provided'},
		validators: [Validators.required],
		inputType: 'text',
		label: 'Description',
		key: 'description',
	},
	{
		inputType: 'checkbox',
		label: 'favourite',
		key: 'favourite',
	},
	{
		value: 'recipe',
		prefixIcon: 'account_circle',
		inputType: 'select',
		options: ['recipe', 'meal'],
		label: 'Kind',
		key: 'kind'
	},
	{
		label: 'Ingredients',
		key: 'ingredients',
		inputType: 'custom'
	},
	{
		label: 'Picture (optional)',
		inputType: 'file',
		key: 'picture'
	}
];
