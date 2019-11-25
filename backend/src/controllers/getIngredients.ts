import {Request, Response} from 'express';
import {IngredientModel} from '../models/FoodTrackingModels';
import {placeholderIngredients} from '../placeholder-data/ingredients';


export function searchIngredients(req: Request, res: Response) {
	const queryParams = req.query;

	const filter = queryParams.filter || '';
	const sortOrder = queryParams.sortOrder;
	const pageNumber = parseInt(queryParams.pageNumber, 10) || 0;

	let ingredients = Object.values(placeholderIngredients)
	.sort((l1, l2) => l1.id - l2.id);

	const pageSize = parseInt(queryParams.pageSize, 10) || ingredients.length;

	if (filter) {
		ingredients = ingredients.filter((ingredient) => ingredient.name.trim().toLowerCase().search(filter.toLowerCase()) >= 0);
	}

	if (sortOrder === 'desc') {
		ingredients = ingredients.reverse();
	}

	const initialPos = pageNumber * pageSize;

	const ingredientsPage = ingredients.slice(initialPos, initialPos + pageSize);
	// console.log(pageNumber);
	// console.log(pageSize);

	res.status(200).json({payload: ingredientsPage});

}

export function getIngredient(req: Request, res: Response) {
	res.status(200).json({payload: placeholderIngredients[1]});
}
