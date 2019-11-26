import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FORM_MODE, getFormModel, passwordsMustMatchValidator, QuestionModel} from './user-sign.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
	selector: 'app-user-sign',
	templateUrl: './user-sign.component.html',
	styleUrls: ['./user-sign.component.scss']
})
export class UserSignComponent implements OnInit {

	name = new FormControl('', [Validators.required, Validators.pattern(/ /)]);
	username = new FormControl('', [Validators.required]);
	email = new FormControl('', [Validators.required, Validators.email]);
	password = new FormControl('', [Validators.required, Validators.minLength(6)]);
	password2 = new FormControl('', [Validators.required, Validators.minLength(6)]);
	usernameOrEmail = new FormControl('', [Validators.required]);
	form: FormGroup;
	formModel: QuestionModel[];

	FORM_MODE = FORM_MODE;
	// @Input() mode: FORM_MODE;
	mode: FORM_MODE;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
	}

	ngOnInit() {
		this.switchMode();
	}

	onSubmit() {
		if (this.mode === FORM_MODE.up) {
			this.authService.register(this.form.value)
			.subscribe((result) => {
				console.log(result);
				if (result.status === 'success') {
					this.switchMode();
				} else {
					alert(result.status.toLocaleUpperCase() + ' - ' + result.message);
				}
			});
		} else if (this.mode === FORM_MODE.in) {
			this.authService.login(this.form.value.usernameOrEmail, this.form.value.password)
			.subscribe((result) => {
				if (result.status === 'success') {
					this.form.reset();
					this.router.navigate(['/today'])
					.catch((e) => {
						console.log('error navigating');
						throw e;
					});
				} else {
					alert(result.status.toLocaleUpperCase() + ' - ' + result.message);
				}
			});
		}
	}

	getControlError(controlName: string): string | null {
		const errors = this.form.controls[controlName].errors;
		if (errors) {
			return Object.keys(errors)[0];
		} else {
			return null;
		}
	}

	switchMode() {
		this.mode = this.mode === FORM_MODE.up ? FORM_MODE.in : FORM_MODE.up;
		this.formModel = getFormModel(this.mode);
		const controls: { [key: string]: FormControl } = {};
		this.formModel
		.forEach((question: QuestionModel) => {
			controls[question.key] = new FormControl('', question.validators);
		});

		if (this.mode === FORM_MODE.up) {
			this.form = this.fb.group(controls, {
				validator: passwordsMustMatchValidator('password2', 'password')  // TODO fix this workaround
			});
		} else {
			this.form = this.fb.group(controls);
		}
	}
}
