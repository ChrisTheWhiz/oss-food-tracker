import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodayPageComponent} from './main-pages/today-page/today-page.component';

const routes: Routes = [
	{path: '', component: TodayPageComponent, pathMatch: 'full'},
	{path: '*', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
