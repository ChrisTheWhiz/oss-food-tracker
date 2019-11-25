import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IngredientsDatasource} from '../../services/ingredients.datasource';
import {IngredientsService} from '../../services/ingredients.service';
import {ActivatedRoute} from '@angular/router';
import {Ingredient} from '../../models/ingredient';
import {TABLE_MODES} from '../../models/ingredient';
import {ConversionsUtil} from '../../utils/conversions.util';

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

	@ViewChild('input', {static: true}) input: ElementRef;

	constructor(
		private route: ActivatedRoute,
		private ingredientsService: IngredientsService,
		private conversions: ConversionsUtil) {
	}

	ngOnInit() {
		this.dataSource = new IngredientsDatasource(this.ingredientsService);
		this.dataSource.loadIngredients();
		this.tableMode = TABLE_MODES.favourites;
	}
}
