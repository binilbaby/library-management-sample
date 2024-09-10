import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Book } from '../../books/schemas/book.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: string; // librarian, staff, or student
  
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Book' }] })
  issuedBooks: Types.ObjectId[]; // Array of ObjectIds referencing Book
}

export const UserSchema = SchemaFactory.createForClass(User);
