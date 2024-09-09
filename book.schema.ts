import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  isbn: string;

  @Prop({ default: null })
  issuedTo: string; // Reference to user id (Staff/Student)

  @Prop({ default: null })
  issuedBy: string; // Librarian id
}

export const BookSchema = SchemaFactory.createForClass(Book);
