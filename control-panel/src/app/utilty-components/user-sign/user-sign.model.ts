import {ValidatorFn, Validators} from '@angular/forms';

export enum FORM_MODE {
	up = 'up',
	in = 'in',
}

export interface QuestionModel {
	placeholder: string | null;
	prefixIcon: string;
	errorMessages: string[];
	validators: ValidatorFn[];
	inputType: string;
	label: string;
	key: string;
}

const signInFormModel: QuestionModel[] = [
	{
		placeholder: 'JoeWithDough50',
		prefixIcon: 'emoji_people',
		errorMessages: ['Field is missing or you don\'t have at least 2 words'],
		validators: [Validators.required], // TODO add validators for username/password
		inputType: 'text',
		label: 'Username Or Email',
		key: 'usernameOrEmail',
	},
	{
		placeholder: 'tomato6avocados',
		prefixIcon: 'lock',
		errorMessages: ['Field is missing or does not have 6 characters'],
		validators: [Validators.required, Validators.minLength(6)],
		inputType: 'password',
		label: 'Password',
		key: 'password',
	}
];

const signUpFormModel: QuestionModel[] = [
	{
		placeholder: 'Clementine Cerise',
		prefixIcon: 'emoji_people',
		errorMessages: [' Field is missing or you don\'t have at least 2 words'],
		validators: [Validators.required, Validators.pattern(/ /)],
		inputType: 'text',
		label: 'Name',
		key: 'name',
	},
	{
		placeholder: 'tomato6avocados',
		prefixIcon: 'lock',
		errorMessages: ['Field is missing or does not have 6 characters'],
		validators: [Validators.required, Validators.minLength(6)],
		inputType: 'password',
		label: 'Password',
		key: 'password',
	},
	{
		placeholder: 'tomato6avocados',
		prefixIcon: 'lock',
		errorMessages: ['The passwords do not match'],
		validators: [Validators.required],
		inputType: 'password',
		label: 'Password again',
		key: 'password2',
	},
	{
		placeholder: 'JoeWithDough50',
		prefixIcon: 'account_circle',
		errorMessages: ['Field is missing'],
		validators: [Validators.required],
		inputType: 'text',
		label: 'Username',
		key: 'username',
	},
	{
		placeholder: 'chip.dulce@breakfast.fig',
		prefixIcon: 'email',
		errorMessages: [' Field is missing is not a valid email address'],
		validators: [Validators.required, Validators.email],
		inputType: 'email',
		label: 'Email',
		key: 'email',
	},
];


export function getFormModel(formMode: FORM_MODE): QuestionModel[] {
	if (formMode === FORM_MODE.in) {
		return signInFormModel;
	} else if (formMode === FORM_MODE.up) {
		return signUpFormModel;
	}
}
