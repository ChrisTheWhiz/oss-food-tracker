import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material-module/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChartsModule} from 'ng2-charts';
import {TodayPageComponent} from './main-pages/today-page/today-page.component';
import {NutritionSummaryDashComponent} from './utilty-components/nutrition-summary-dash/nutrition-summary-dash.component';
import {DataProviderService} from './services/data-provider.service';
import {HistoryChartComponent} from './utilty-components/history-chart/history-chart.component';
import {UnsureOfCardComponent} from './utilty-components/unsure-of-card/unsure-of-card.component';
import {DiaryAddComponent} from './utilty-components/diary-add/diary-add.component';
import {FoodTableComponent} from './utilty-components/food-table/food-table.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IngredientsService} from './services/ingredients.service';
import {IngredientEditorComponent} from './utilty-components/ingredient-editor/ingredient-editor.component';
import {BasketComponent} from './utilty-components/basket/basket.component';
import {MealBasketService} from './services/meal-basket.service';
import {IngredientCreationComponent} from './utilty-components/ingredient-creation/ingredient-creation.component';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {ConversionsUtil} from './utils/conversions.util';
import {UserSignComponent} from './utilty-components/user-sign/user-sign.component';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {ErrorInterceptorService} from './services/error-interceptor.service';
import {CreateMealComponent} from './utilty-components/create-meal/create-meal.component';
import {MealService} from './services/meal.service';

@NgModule({
	declarations: [
		AppComponent,
		TodayPageComponent,
		NutritionSummaryDashComponent,
		HistoryChartComponent,
		UnsureOfCardComponent,
		DiaryAddComponent,
		FoodTableComponent,
		IngredientEditorComponent,
		BasketComponent,
		IngredientCreationComponent,
		UserSignComponent,
		CreateMealComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		ChartsModule,
		HttpClientModule,
		Ng2ImgMaxModule
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
		DataProviderService, IngredientsService, MealBasketService, ConversionsUtil, MealService],
	bootstrap: [AppComponent],
	entryComponents: [DiaryAddComponent, IngredientCreationComponent, CreateMealComponent]
})
export class AppModule {
}
