import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Ingredient} from '../../../../shared_code/shared-interfaces';


@Injectable()
export class IngredientsService {

	constructor(private http: HttpClient) {

	}

	// TODO: implement the corresponding backend function
	// findIngredientByName(ingredientName: number): Observable<Course> {
	// 	return this.http.get<Course>(`/api/ingredients/${ingredientName}`);
	// }

	findAllIngredients(): Observable<Ingredient[]> {
		return this.http.get('/api/ingredients')
		.pipe(
			map((res: any) => res.payload)
		);
	}

	getFdcIngredient(fdcId: string): Observable<Ingredient> {
		return this.http.get(`/api/ingredient/${fdcId}`)
		.pipe(
			map((res: any) => res.payload)
		);
	}

	findIngredientsInFdc(description: string): Observable<any[]> {
		// TODO: function to sanitize input
		return this.http.get(`/api/ingredient/find`, {params: {description}})
		.pipe(
			map((res: any) => res.payload)
		);
	}

	addFdcIngredientToLocal(fdcId: string, image?: string | ArrayBuffer): Observable<any> {
		return this.http.post(`/api/addIng/${fdcId}`, {payload: image});
	}

	/*
		Kept in case we need a corresponding function for ingredients
	 */
	// findAllCourseLessons(courseId: number): Observable<Lesson[]> {
	// 	return this.http.get('/api/lessons', {
	// 		params: new HttpParams()
	// 		.set('courseId', courseId.toString())
	// 		.set('pageNumber', '0')
	// 		.set('pageSize', '1000')
	// 	}).pipe(
	// 		map((res: any) =>  res.payload)
	// 	);
	// }

	// TODO: merge this with findAllIngredients() to get a usable, complete function for the ingredients table
	// findLessons(
	// 	courseId: number, filter = '', sortOrder = 'asc',
	// 	pageNumber = 0, pageSize = 3): Observable<Lesson[]> {
	//
	// 	return this.http.get('/api/lessons', {
	// 		params: new HttpParams()
	// 		.set('courseId', courseId.toString())
	// 		.set('filter', filter)
	// 		.set('sortOrder', sortOrder)
	// 		.set('pageNumber', pageNumber.toString())
	// 		.set('pageSize', pageSize.toString())
	// 	}).pipe(
	// 		map((res: any) =>  res.payload)
	// 	);
	// }

}
