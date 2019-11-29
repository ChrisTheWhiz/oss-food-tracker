import {Types} from 'mongoose';

export interface User {
	username: string;
	_id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	date: Date;
	jwt?: string;
}
