import { Document } from 'mongoose';
export declare class Book extends Document {
    title: string;
    author: string;
    publishedDate: string;
    isbn: string;
    description: string;
    thumbnail: string;
}
export declare const BookSchema: import("mongoose").Schema<Book, import("mongoose").Model<Book, any, any, any, Document<unknown, any, Book> & Book & Required<{
    _id: unknown;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Book, Document<unknown, {}, import("mongoose").FlatRecord<Book>> & import("mongoose").FlatRecord<Book> & Required<{
    _id: unknown;
}>>;
