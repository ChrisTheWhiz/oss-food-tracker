import {Document, Schema, Model, model, SchemaTypes, Types} from 'mongoose';
import {IPersonalMeal, mealInstanceSchema, PersonalMealModel, personalMealSchema} from './mealRecipeModel';


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
		personalMeals: [personalMealSchema],
		mealHistory: [mealInstanceSchema]
	}
}, {strict: 'throw'});

export interface IUserModel extends Document {
	username: string;
	name: string;
	email: string;
	password: string;
	date: string;
	foodData: {
		personalMeals: IPersonalMeal[],
		mealHistory: Types.ObjectId[]
	};
}

export const UserModel: Model<IUserModel> = model<IUserModel>('user', UserSchema);
