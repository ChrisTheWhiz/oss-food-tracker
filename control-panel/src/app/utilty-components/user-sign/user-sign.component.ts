import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
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

	@Output() modalClose: EventEmitter<any> = new EventEmitter<any>();
	@HostListener('document:keydown.escape', ['$event']) onEscHandler(event: KeyboardEvent) {
		this.closeModal('escape pressed');
	}

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
	}

	ngOnInit() {
		// a bit tricky, but since we init the form with switchMode(), we'll want to initialize this.mode with the *opposite* value of what we need
		this.mode = this.authService.checkIfHasBeenLogged() ? FORM_MODE.up : FORM_MODE.in;
		this.switchMode();
	}

	onSubmit() {
		if (this.mode === FORM_MODE.up) {
			this.authService.register(this.form.value)
			.subscribe((result) => {
				// console.log(result);
				if (result.status === 'success') {
					this.closeModal('closed registration');
				} else {
					alert(result.status.toLocaleUpperCase() + ' - ' + result.message);
				}
			});
		} else if (this.mode === FORM_MODE.in) {
			this.authService.login(this.form.value.usernameOrEmail, this.form.value.password)
			.subscribe((result) => {
				if (result.status === 'success') {
					this.closeModal('closed login');
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

	closeModal($event) {
		this.router.navigate([{outlets: {modal: null}}]);
		this.modalClose.next($event);
	}
}
