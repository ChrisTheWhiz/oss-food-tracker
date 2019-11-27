import {FormGroup, ValidatorFn, Validators} from '@angular/forms';

export enum FORM_MODE {
	up = 'up',
	in = 'in',
}

export interface QuestionModel {
	placeholder: string | null;
	prefixIcon: string;
	errorMessages: string[] | { [key: string]: string };
	validators: ValidatorFn[];
	inputType: string;
	label: string;
	key: string;
}

const signInFormModel: QuestionModel[] = [
	{
		placeholder: 'JoeDough50',
		prefixIcon: 'emoji_people',
		errorMessages: {required: 'No username provided'},
		validators: [Validators.required], // TODO add validators for username/password
		inputType: 'text',
		label: 'Username Or Email',
		key: 'usernameOrEmail',
	},
	{
		placeholder: 'tomato6avocados',
		prefixIcon: 'lock',
		errorMessages: {required: 'No password given', minlength: 'Password does not have 6 characters'},
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
		errorMessages: {required: 'No name provided', pattern: 'You need to have at least a name and surname'},
		validators: [Validators.required, Validators.pattern(/ \w/)],
		inputType: 'text',
		label: 'Name',
		key: 'name',
	},
	{
		placeholder: 'tomato6avocados',
		prefixIcon: 'lock',
		errorMessages: {required: 'Field is missing', minlength: 'does not have 6 characters'},
		validators: [Validators.required, Validators.minLength(6)],
		inputType: 'password',
		label: 'Password',
		key: 'password',
	},
	{
		placeholder: 'tomato6avocados',
		prefixIcon: 'lock',
		errorMessages: {mustmatch: 'The passwords do not match'},
		validators: [/* Custom validator that acts at group level is used here */],
		inputType: 'password',
		label: 'Password again',
		key: 'password2',
	},
	{
		placeholder: 'JoeDough50',
		prefixIcon: 'account_circle',
		errorMessages: {required: 'Field is missing'},
		validators: [Validators.required],
		inputType: 'text',
		label: 'Username',
		key: 'username',
	},
	{
		placeholder: 'chip.fish@breakfast.fig',
		prefixIcon: 'email',
		errorMessages: {required: ' Field is missing', email: '¡That is not a valid email address¡'},
		validators: [Validators.required, Validators.email],
		inputType: 'email',
		label: 'Email',
		key: 'email',
	},
];


export function getFormModel(formMode: FORM_MODE): QuestionModel[] {
	if (formMode === FORM_MODE.in) {
		return signInFormModel;
	} else { // is mode = up
		return signUpFormModel;
	}
}

export function passwordsMustMatchValidator(controlName: string, matchingControlName: string) {
	return (formGroup: FormGroup) => {
		const control = formGroup.controls[controlName];
		const matchingControl = formGroup.controls[matchingControlName];

		if (matchingControl.errors && !matchingControl.errors.mustmatch) {
			return;
		}
		if (matchingControl.value !== control.value) {
			control.setErrors({mustmatch: true});
		} else {
			control.setErrors(null);
		}
	};
}
