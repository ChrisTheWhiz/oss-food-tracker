import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

const materialModules = [
	MatButtonModule,
	MatInputModule,
	MatFormFieldModule,
	MatSelectModule,
	MatIconModule,
	MatToolbarModule,
	MatCardModule,
	MatProgressBarModule,
	MatDatepickerModule,
	MatMomentDateModule,
	MatTableModule,
	MatTabsModule,
	SatDatepickerModule,
	SatNativeDateModule,
	MatPaginatorModule,
	MatProgressSpinnerModule,
	MatSortModule,
	MatButtonToggleModule,
	MatDialogModule,
	MatCheckboxModule
];

@NgModule({
	declarations: [],
	imports: [
		materialModules
	],
	exports: [
		materialModules
	]
})
export class MaterialModule {
}
