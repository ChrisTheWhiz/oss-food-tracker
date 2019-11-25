import {Component} from '@angular/core';
import {FORM_MODE} from './utilty-components/user-sign/user-sign.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'control-panel';
  modeIn = FORM_MODE.in;
  modeUp = FORM_MODE.up;
}
