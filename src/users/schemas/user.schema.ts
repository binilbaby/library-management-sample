import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ default: [] })
  issuedBooks: string[]; // Array of book IDs
}

export const UserSchema = SchemaFactory.createForClass(User);
