import { BooksService } from './books.service';
import { CreateBookDto } from '../common/dto/create-book.dto';
import { IssueBookDto } from '../common/dto/issue-book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    addBook(createBookDto: CreateBookDto): Promise<import("./schemas/book.schema").Book>;
    issueBook(issueBookDto: IssueBookDto): Promise<import("./schemas/book.schema").Book>;
    getAllBooks(): Promise<import("./schemas/book.schema").Book[]>;
}
