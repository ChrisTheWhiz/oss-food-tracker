import {Request, Response} from 'express';
import {IngredientModel} from '../models/ingredient';
import request from 'request';
import {Ingredient} from '../../../shared_code/shared-interfaces';
import {FOOD_KIND, INGREDIENT_SOURCES} from '../../../shared_code/shared-enums';
import {getNutrientsFromFdcResponse} from '../utils/fdcUtils';

export function localGetIngredients(req: Request, res: Response) {
	const ingredientQuery = req.query.id ? {id: req.query.id} : {};
	IngredientModel.find(ingredientQuery).lean()
		.then((result) => {
			res.json({payload: result});
		});
}

export function fdcIngredientSearch(req: Request, res: Response) {
	const description = req.query.description;
	request({
		url: 'https://api.nal.usda.gov/fdc/v1/search?api_key=yhVOnrtGXAQDUA6CTSOw4fB4VE6x2Q09g0SFrikv',
		method: 'POST',
		json: true,
		body: {
			generalSearchInput: description,
			includeDataTypes: {
				'Survey (FNDDS)': true,
				'Foundation': false,
				'Branded': false,
				'SR Legacy': false
			}
		}
	}, (err, resp, body) => {
		const results = body.foods;
		const response: any[] = [];
		results.forEach((result: any) => {
			if (result.dataType !== 'Survey (FNDDS)') {
				throw new Error('it seems a food is not from Survey!');
			}
			response.push({
				fdcId: result.fdcId,
				description: result.description,
				score: result.score
			});
		});
		// console.log(response);
		res.json({payload: response});
	});
}

export function fdcGetIngredient(req: Request, res: Response) {
	const fdcId = req.params.fdcId;
	request(`https://api.nal.usda.gov/fdc/v1/${fdcId}?api_key=yhVOnrtGXAQDUA6CTSOw4fB4VE6x2Q09g0SFrikv`, {json: true}, (err, resp, body) => {
		const newIngredient: Ingredient = {
			kind: FOOD_KIND.INGREDIENT,
			description: body.description,
			source: INGREDIENT_SOURCES.SURVEY,
			fdcId: body.fdcId,
			nutrition: getNutrientsFromFdcResponse(body.foodNutrients)
		};
		res.json({payload: newIngredient});
	});
}

export function manuallyAddIngredientToLocal(req: Request, res: Response) {
	const body = req.body;
	const newIngredient = new IngredientModel(body.newIngredient);
	newIngredient.save((err, product) => {
		if (err) {
			console.log(err);
		} else {
			res.send(product);
		}
	});
	// console.log(newIngredient);
}

export function fdcGetIngredientLocalAddIngredient(req: Request, res: Response) {
	const fdcId = req.params.id;
	let image = req.body.payload;
	if (image) {
		image = Buffer.from(image, 'base64');
	}
	request(`https://api.nal.usda.gov/fdc/v1/${fdcId}?api_key=yhVOnrtGXAQDUA6CTSOw4fB4VE6x2Q09g0SFrikv`, {json: true}, (err, resp, body) => {
		console.log('kek');
		const nutrients = getNutrientsFromFdcResponse(body.foodNutrients);
		console.log('lel');
		const newIngredient: Ingredient = {
			kind: FOOD_KIND.INGREDIENT,
			description: body.description,
			source: INGREDIENT_SOURCES.SURVEY,
			fdcId: body.fdcId,
			nutrition: getNutrientsFromFdcResponse(body.foodNutrients)
		};
		console.log('lawl');
		const newIngredientDoc = new IngredientModel(newIngredient);
		newIngredientDoc.save()
			.then((resp) => {
				res.json({
					status: 'success',
					message: resp
				});
			})
			.catch((e) => {
				console.log(e);
				res.send('error :(');
			});
	});
}
