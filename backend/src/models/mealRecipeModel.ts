import {model, Schema, SchemaTypes, Document} from 'mongoose';
import {IngredientModel} from './ingredientModel';

export const ingredientInstanceSchema = new Schema({
	ingredient: {
		type: SchemaTypes.ObjectId,
		ref: IngredientModel.collection.collectionName
	},
	quantity: Number // always in grams
}, {_id: false});



const personalMealSchema = new Schema({
	description: String,
	favourite: SchemaTypes.Boolean,
	kind: {
		type: String,
		enum: ['meal', 'recipe']
	},
	ingredients: [{
		ingredient: [ingredientInstanceSchema]
	}]
});

export const PersonalMealModel = model('PersonalMeal', personalMealSchema);


const mealInstanceSchema = new Schema({
	meal: {
		type: SchemaTypes.ObjectId,
		ref: PersonalMealModel.collection.collectionName
	},
	quantity: Number,
	timeOfConsumption: SchemaTypes.Date
});

export const MealInstanceModel = model('MealInstance', mealInstanceSchema);
