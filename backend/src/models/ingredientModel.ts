import {model, Schema, SchemaTypes, Document} from 'mongoose';


const nutrientSchema = new Schema({
	id: Number,
	name: String,
	unitName: String,
	amount: Number
}, {_id: false});

export const NutrientModel = model('Nutrient', nutrientSchema);

export const ingredientSchema = new Schema({
	description: String,
	source: String,
	image: {
		type: SchemaTypes.Buffer
	},
	fdcData: {
		type: SchemaTypes.Mixed,
		fdcId: String,
		required: false
	},
	nutrition: [nutrientSchema]
}, {strict: 'throw'});


export const IngredientModel = model('Ingredient', ingredientSchema);
