import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IngredientsDatasource} from '../../services/ingredients.datasource';
import {IngredientsService} from '../../services/ingredients.service';
import {ActivatedRoute} from '@angular/router';
import {ConversionsUtil} from '../../utils/conversions.util';
import {MealBasketService} from '../../services/meal-basket.service';
import {HttpClient} from '@angular/common/http';
import {TABLE_MODES} from '../../models/enums';
import {Ingredient} from '../../../../../shared_code/shared-interfaces';

@Component({
	selector: 'app-food-table',
	templateUrl: './food-table.component.html',
	styleUrls: ['./food-table.component.scss'],
})
export class FoodTableComponent implements OnInit {
	isLoading: true;
	dataSource: IngredientsDatasource;
	displayedColumns = ['image', 'name', 'protein', 'carb', 'fat'];
	expandedIngredient: Ingredient | null;
	tableModes = Object.keys(TABLE_MODES);
	tableMode: TABLE_MODES;

	@Input() addToBasketOrCreate: string;
	@Output() passItem = new EventEmitter<any[]>();


	constructor(
		private route: ActivatedRoute,
		private ingredientsService: IngredientsService,
		private conversions: ConversionsUtil,
		private basketService: MealBasketService,
		private httpClient: HttpClient) {
	}

	ngOnInit() {
		this.dataSource = new IngredientsDatasource(this.ingredientsService);
		this.dataSource.loadIngredients();
		this.tableMode = TABLE_MODES.favourites;
	}

	processItem(item) {
		// item = [this.ingredientInstance, this.meal, this.servingType, this.quantity, this.image];
		if (this.addToBasketOrCreate === 'basket') {
			this.basketService.addToBasket(item[0], item[1], item[2], item[3], item[4]);
		} else if (this.addToBasketOrCreate === 'create') {
			this.passItem.emit(item);
		}
	}
}
