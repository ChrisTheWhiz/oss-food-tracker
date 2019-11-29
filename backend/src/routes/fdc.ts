import {Request, Response, Router} from 'express';
import mongoose from 'mongoose';
import request from 'request';
import {getNutrientsFromFdcResponse} from '../controllers/fdcUtils';
import {IngredientModel} from '../models/ingredient';
import {INGREDIENT_SOURCES} from '../../../shared_code/shared-enums';


const router = Router();

// Handle Registration
router.get('/ingredients', findIngredientInLocal);

function findIngredientInLocal(req: Request, res: Response) {
	const ingredientQuery = req.query.id ? {id: req.query.id} : {};
	IngredientModel.find(ingredientQuery).lean()
	.then((result) => {
		res.json({payload: result});
	});
}

router.get('/ingredient', findIngredientInLocal);

function findSingleIngredient(req: Request, res: Response) { // TODO make this function useful
	IngredientModel.findOne({}).lean()
	.then((result) => {
		res.json({payload: result});
	});
}


router.get('/ingredient/find', findIngredient);

function findIngredient(req: Request, res: Response) {
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

router.get('/ingredient/:fdcId', getIngredientInFDC);

function getIngredientInFDC(req: Request, res: Response) {
	const fdcId = req.params.fdcId;
	request(`https://api.nal.usda.gov/fdc/v1/${fdcId}?api_key=yhVOnrtGXAQDUA6CTSOw4fB4VE6x2Q09g0SFrikv`, {json: true}, (err, resp, body) => {
		const newIngredient = new IngredientModel({
			description: body.description,
			source: INGREDIENT_SOURCES.SURVEY,
			fdcId: body.fdcId,
			nutrition: getNutrientsFromFdcResponse(body.foodNutrients)
		});
		res.json({payload: newIngredient});
	});
}

router.post('/ingredient', manuallyAddIngredientToLocal);

function manuallyAddIngredientToLocal(req: Request, res: Response) {
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

router.post('/addIng/:id', addIngredientFromFdcToLocal);

function addIngredientFromFdcToLocal(req: Request, res: Response) {
	const fdcId = req.params.id;
	let image = req.body.payload;
	if (image) {
		image = Buffer.from(image, 'base64');
	}
	// console.log(image);
	request(`https://api.nal.usda.gov/fdc/v1/${fdcId}?api_key=yhVOnrtGXAQDUA6CTSOw4fB4VE6x2Q09g0SFrikv`, {json: true}, (err, resp, body) => {
		const nutrients = getNutrientsFromFdcResponse(body.foodNutrients);
		const newIngredient = new IngredientModel({
			description: body.description,
			source: body.foodClass,
			image,
			fdcData: {
				source: body.foodClass,
				todo: 'to add more stuff' // TODO implement this
			},
			nutrition: nutrients
		});
		newIngredient.save((err, product) => {
			if (err) {
				console.log(err);
			} else {
				res.send(product);
			}
		});
	});
}

router.post('/image-upload', uploadBase64Img);

function uploadBase64Img(req: Request, res: Response) {
	let image = req.body.payload;
	// console.log(image);
	image = Buffer.from(image, 'base64');
	IngredientModel.updateOne({description: /onion/}, {
			image
		}, (err, raw) =>
			res.send(err || raw)
	);
}

export {router as FdcRoutes};
