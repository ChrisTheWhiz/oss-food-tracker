export const UserFormSchema = {
	name: {
		label: 'Name',
		validators: ['required'],
		inputType: 'text'
	},
	email: {
		label: 'Email',
		validators: ['unique', 'required', {
			customValidatorName: 'email',
			customValidatorMessage: 'The email field needs to have email format!'
		}],
		inputType: 'email'
	},
	password: {
		label: 'Password',
		validators: ['required',
			['minlength', 8],
			{
				customValidatorName: 'password',
				customValidatorMessage: 'The password field needs to contain at least a number'
			}],
		inputType: 'password'
	},
	username: {
		label: 'Username',
		validators: ['required', 'unique'],
		inputType: 'text'
	},
	gender: {
		label: 'Gender',
		validators: ['required'],
		inputType: 'select',
		options: ['Male', 'Female']
	},
	age: {
		label: 'Age',
		validators: ['required',
			['min', 15],
			['max', 120]
		],
		inputType: 'number'
	}
};
