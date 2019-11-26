import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginMockComponent} from './mocks/login-mock/login-mock.component';
import {MaterialModule} from './material-module/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DiarySummaryMockComponent} from './mocks/diary-summary-mock/diary-summary-mock.component';
import {ChartsModule} from 'ng2-charts';
import {HistoryViewerMockComponent} from './mocks/history-viewer-mock/history-viewer-mock.component';
import {FoodAddMockComponent} from './mocks/food-add-mock/food-add-mock.component';
import {PeriodSummaryMockComponent} from './mocks/period-summary-mock/period-summary-mock.component';
import {TodayPageComponent} from './main-pages/today-page/today-page.component';
import {NutritionSummaryDashComponent} from './utilty-components/nutrition-summary-dash/nutrition-summary-dash.component';
import {DataProviderService} from './services/data-provider.service';
import {HistoryChartComponent} from './utilty-components/history-chart/history-chart.component';
import {UnsureOfCardComponent} from './utilty-components/unsure-of-card/unsure-of-card.component';
import {DiaryAddComponent} from './utilty-components/diary-add/diary-add.component';
import {FoodTableComponent} from './utilty-components/food-table/food-table.component';
import {HttpClientModule} from '@angular/common/http';
import {IngredientsService} from './services/ingredients.service';
import {IngredientEditorComponent} from './utilty-components/ingredient-editor/ingredient-editor.component';
import {BasketComponent} from './utilty-components/basket/basket.component';
import {MealBasketService} from './services/meal-basket.service';
import {IngredientCreationComponent} from './utilty-components/ingredient-creation/ingredient-creation.component';
import {ImageService} from './services/image.service';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {ConversionsUtil} from './utils/conversions.util';
import {UserSignComponent} from './utilty-components/user-sign/user-sign.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginMockComponent,
		DiarySummaryMockComponent,
		HistoryViewerMockComponent,
		FoodAddMockComponent,
		PeriodSummaryMockComponent,
		TodayPageComponent,
		NutritionSummaryDashComponent,
		HistoryChartComponent,
		UnsureOfCardComponent,
		DiaryAddComponent,
		FoodTableComponent,
		IngredientEditorComponent,
		BasketComponent,
		IngredientCreationComponent,
		UserSignComponent
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
	providers: [DataProviderService, IngredientsService, MealBasketService, ImageService, ConversionsUtil],
	bootstrap: [AppComponent],
	entryComponents: [DiaryAddComponent, IngredientCreationComponent]
})
export class AppModule {
}
