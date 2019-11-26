import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserOpsService} from '../../services/user-ops.service';
import {FORM_MODE, getFormModel, QuestionModel} from './user-sign.model';
import {AuthService} from '../../services/auth.service';


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
	status = 'pending';

	// @Input() mode: FORM_MODE;
	mode: FORM_MODE;

	constructor(
		private fb: FormBuilder,
		private userOps: UserOpsService,
		private authService: AuthService
	) {
	}

	ngOnInit() {
		this.mode = FORM_MODE.in;
		this.formModel = getFormModel(this.mode);
		this.form = this.fb.group({});
		this.formModel
		.forEach((question: QuestionModel) => {
			this.form.addControl(question.key, this.fb.control('', question.validators));
		});
	}

	onSubmit() {
		if (this.mode === FORM_MODE.up) {
			this.authService.register(this.form.value)
			.subscribe((result) => {
				this.status = result;
			});
		} else if (this.mode === FORM_MODE.in) {

			this.authService.login(this.form.value.usernameOrEmail, this.form.value.password)
			.subscribe((result) => {
				if (result) {
					this.status = 'Logged in!';
				}
			});
		}

		this.form.reset(); // TODO only reset when form is valid
	}
}
