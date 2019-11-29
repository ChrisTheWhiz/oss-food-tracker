import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {IngredientsService} from './ingredients.service';
import {Ingredient} from '../../../../shared_code/shared-interfaces';


export class IngredientsDatasource implements DataSource<Ingredient> {

	private ingredientsSubject = new BehaviorSubject<Ingredient[]>([]);
	private loadingSubject = new BehaviorSubject<boolean>(false);

	public loading$ = this.loadingSubject.asObservable();

	constructor(private ingredientService: IngredientsService) {
	}

	connect(collectionViewer: CollectionViewer): Observable<Ingredient[]> {
		return this.ingredientsSubject.asObservable();
	}

	disconnect(collectionViewer: CollectionViewer): void {
		this.ingredientsSubject.complete();
		this.loadingSubject.complete();
	}

	loadIngredients(filter = '', sortDirection = 'asc', pageIndex = 0, pageSize = 4) {

		this.loadingSubject.next(true);

		this.ingredientService.findAllIngredients()
		.pipe(
			catchError(() => of([])),
			finalize(() => this.loadingSubject.next(false))
		)
		.subscribe(ingredients => this.ingredientsSubject.next(ingredients));
	}
}
