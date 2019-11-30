import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Ingredient} from '../../../../shared_code/shared-interfaces';


@Injectable()
export class IngredientsService {

	constructor(private http: HttpClient) {

	}

	fdcIngredientSearch(description: string): Observable<any[]> {
		// TODO: function to sanitize input
		return this.http.get(`/api/fdc/ingredient/find`, {params: {description}})
			.pipe(
				map((res: any) => res.payload)
			);
	}

	fdcGetIngredient(fdcId: string): Observable<Ingredient> {
		return this.http.get(`/api/fdc/ingredient/${fdcId}`)
			.pipe(
				map((res: any) => res.payload)
			);
	}

	fdcGetIngredientLocalAddIngredient(fdcId: string, image?: string | ArrayBuffer): Observable<any> {
		return this.http.post(`/api/fdc/addIng/${fdcId}`, {payload: image});
	}

	localGetIngredients(): Observable<Ingredient[]> {
		return this.http.get('/api/ingredients')
			.pipe(
				map((res: any) => res.payload)
			);
	}
}
