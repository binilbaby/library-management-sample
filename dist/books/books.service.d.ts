import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
export declare class BooksService {
    private bookModel;
    constructor(bookModel: Model<Book>);
    addBook(createBookDto: any): Promise<Book>;
    getAllBooks(): Promise<Book[]>;
    issueBook(issueBookDto: any): Promise<Book>;
}
