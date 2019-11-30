import {Document, model, Schema, SchemaTypes} from 'mongoose';
import {IngredientModel} from './ingredient';
import {Ingredient} from '../../../shared_code/shared-interfaces';
import {FOOD_KIND} from '../../../shared_code/shared-enums';

export const mealSchema = new Schema({
	description: {
		type: String,
		required: true
	},
	image: {
		type: SchemaTypes.Buffer,
		required: false
	},
	kind: {
		type: String,
		enum: Object.keys(FOOD_KIND),
		required: true
	},
	ingredients: [{
		ingredient: {
			type: SchemaTypes.ObjectId,
			ref: IngredientModel.collection.collectionName
		},
		quantity: Number // always in grams
	}]
}, {strict: 'throw'});

export interface IMealModel extends Ingredient, Document {
}

export const MealModel = model<IMealModel>('PersonalMeal', mealSchema);

export const foodInstanceSchema = new Schema({
	foodType: {
		type: String,
		enum: ['Ingredient', 'Meal']
	},
	quantity: Number, // always in grams
	timeOfConsumption: {
		type: Date,
		default: Date.now()
	},
	mealTime: String,
	food: {
		type: SchemaTypes.ObjectId,
		refPath: 'foodType'
	}
}, {_id: false});
