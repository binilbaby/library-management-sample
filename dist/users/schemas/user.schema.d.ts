import { Document, Schema as MongooseSchema, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    password: string;
    role: string;
    issuedBooks: Types.ObjectId[];
}
export declare const UserSchema: MongooseSchema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & {
    _id: Types.ObjectId;
}>;
