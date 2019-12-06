import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodayPageComponent} from './main-pages/today-page/today-page.component';
import {AuthGuardService} from './services/auth-guard.service';
import {UserSignComponent} from './utilty-components/user-sign/user-sign.component';

const routes: Routes = [
	{path: 'today', component: TodayPageComponent, pathMatch: 'full', canActivate: [AuthGuardService]},
	{path: 'login', component: UserSignComponent, pathMatch: 'full', outlet: 'modal'},
	{path: '', redirectTo: 'today', pathMatch: 'full'},
	{path: '**', redirectTo: 'today', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
