import {model, Schema, SchemaTypes, Document} from 'mongoose';
import {IngredientModel} from './ingredientModel';

export const ingredientInstanceSchema = new Schema({
	ingredient: {
		type: SchemaTypes.ObjectId,
		ref: IngredientModel.collection.collectionName
	},
	quantity: Number // always in grams
}, {_id: false});


export interface IPersonalMeal {
	description: string;
	favourite: boolean;
	kind: string; // TODO create enum
	ingredients: any[]; // TODO create interface for ingredientInstanceSchema
}

export const personalMealSchema = new Schema({
	description: String,
	favourite: SchemaTypes.Boolean,
	quantity: {
		type: Number,
		require: false
	},
	kind: {
		type: String,
		enum: ['meal', 'recipe']
	},
	picture: {
		type: SchemaTypes.Buffer,
		required: false
	},
	ingredients: [{
		ingredient: [ingredientInstanceSchema]
	}]
});

export const PersonalMealModel = model('PersonalMeal', personalMealSchema);


// todo IMealInstanceSchema
export const mealInstanceSchema = new 	Schema({
	meal: {
		type: SchemaTypes.ObjectId,
		ref: PersonalMealModel.collection.collectionName
	},
	quantity: Number,
	timeOfConsumption: SchemaTypes.Date
}, {strict: 'throw'});

export const MealInstanceModel = model('MealInstance', mealInstanceSchema);
