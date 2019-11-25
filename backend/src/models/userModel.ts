import {Document, Schema, Model, model, SchemaTypes} from 'mongoose';
import {PersonalMealModel} from './mealRecipeModel';

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
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
	date: {
		type: Date,
		default: Date.now()
	},
	foodData: {
		personalMeals: {
			type: [SchemaTypes.ObjectId],
			ref: PersonalMealModel.collection.collectionName
		},
		mealHistory: {
			type: [SchemaTypes.ObjectId],
			ref: PersonalMealModel.collection.collectionName
		}
	}
});

export interface IUserModel extends Document {
	name: string;
	email: string;
	password: string;
	date: string;
}

export const UserModel: Model<IUserModel> = model<IUserModel>('user', UserSchema);
