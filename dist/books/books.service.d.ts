import { Model } from 'mongoose';
import { Book } from '../books/schemas/book.schema';
import { User } from '../users/schemas/user.schema';
import { Types } from 'mongoose';
export declare class BooksService {
    private bookModel;
    private userModel;
    constructor(bookModel: Model<Book>, userModel: Model<User>);
    addBookByISBN(isbn: string): Promise<Book>;
    getAllBooks(): Promise<Book[]>;
    issueBook(issueBookDto: any): Promise<Book>;
    viewIssuedBooks(userId: string): Promise<Types.ObjectId[]>;
    transferBook(bookId: string, fromUserId: string, toUserId: string): Promise<{
        message: string;
    }>;
}
