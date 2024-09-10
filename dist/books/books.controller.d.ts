import { BooksService } from './books.service';
import { IssueBookDto } from '../common/dto/issue-book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    addBook(isbn: string): Promise<import("./schemas/book.schema").Book>;
    issueBook(issueBookDto: IssueBookDto): Promise<import("./schemas/book.schema").Book>;
    viewIssuedBooks(userId: string): Promise<import("mongoose").Types.ObjectId[]>;
    transferBook(bookId: string, toUserId: string, fromUserId: string): Promise<{
        message: string;
    }>;
    getAllBooks(): Promise<import("./schemas/book.schema").Book[]>;
}
