import {Document, Model, model, Schema, SchemaTypes} from 'mongoose';
import {foodInstanceSchema, MealModel, mealSchema} from './meal';
import {User} from '../../../shared_code/shared-interfaces';
import {IngredientModel} from './ingredient';

const UserSchema = new Schema({
	username: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	accountCreated: {
		type: Date,
		default: Date.now()
	},
	foodData: {
		personalMeals: [mealSchema],
		diaryHistory: [foodInstanceSchema],
		recentMeals: {
			type: [SchemaTypes.ObjectId],
			ref: MealModel.collection.collectionName
		},
		favouriteMeals: {
			type: [SchemaTypes.ObjectId],
			ref: MealModel.collection.collectionName
		},
		recentIngredients: {
			type: [SchemaTypes.ObjectId],
			ref: IngredientModel.collection.collectionName
		},
		favouriteIngredients: {
			type: [SchemaTypes.ObjectId],
			ref: IngredientModel.collection.collectionName
		}
	}
}, {strict: 'throw'});

export interface IUserModel extends Document, User {
}

export const UserModel: Model<IUserModel> = model<IUserModel>('user', UserSchema);
