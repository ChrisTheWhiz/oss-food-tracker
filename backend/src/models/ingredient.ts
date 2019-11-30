import {Document, model, Schema, SchemaTypes} from 'mongoose';
import {Ingredient} from '../../../shared_code/shared-interfaces';
import {FOOD_KIND, INGREDIENT_SOURCES, UNIT} from '../../../shared_code/shared-enums';


export const ingredientSchema = new Schema({
	description: {
		type: String,
		require: true
	},
	image: {
		type: SchemaTypes.Buffer,
		required: false
	},
	kind: {
		type: String,
		default: FOOD_KIND.INGREDIENT
	},
	source: {
		type: String,
		enum: Object.keys(INGREDIENT_SOURCES)
	},
	fdcId: {
		type: String,
		required: false
	},
	nutrition: {
		type: [{
			id: Number,
			name: String,
			unitName: {
				type: String
				// enum: Object.keys(UNIT) todo fix this, maybe create an additional enum
			},
			amount: Number
		}],
		required: true
	}
}, {strict: 'throw'});

/**
 * The Ingredient is in shared code, as it also concerns the client
 * Moreover, changes should first be made there and then checked with Angular Compiler
 * @link Ingredient
 */
export interface IIngredientModel extends Ingredient, Document {
}

export const IngredientModel = model<IIngredientModel>('Ingredient', ingredientSchema);
