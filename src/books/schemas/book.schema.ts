import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop()
  publishedDate: string;

  @Prop({ unique: true, required: true })
  isbn: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
