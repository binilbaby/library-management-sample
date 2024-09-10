"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const book_schema_1 = require("../books/schemas/book.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const mongoose_3 = require("mongoose");
let BooksService = class BooksService {
    constructor(bookModel, userModel) {
        this.bookModel = bookModel;
        this.userModel = userModel;
    }
    async addBookByISBN(isbn) {
        const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
        try {
            const response = await axios_1.default.get(googleBooksApiUrl);
            if (!response.data.items || response.data.items.length === 0) {
                throw new common_1.NotFoundException(`No book found with ISBN ${isbn}`);
            }
            const bookData = response.data.items[0].volumeInfo;
            const createBookDto = {
                title: bookData.title,
                author: bookData.authors ? bookData.authors.join(', ') : 'Unknown Author',
                publishedDate: bookData.publishedDate || 'Unknown',
                isbn: isbn,
                description: bookData.description || 'No description available',
                thumbnail: bookData.imageLinks?.thumbnail || 'No thumbnail available',
            };
            const createdBook = new this.bookModel(createBookDto);
            return await createdBook.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Failed to add book using ISBN.');
        }
    }
    async getAllBooks() {
        return this.bookModel.find().exec();
    }
    async issueBook(issueBookDto) {
        console.log("Update Book");
        return this.bookModel.findByIdAndUpdate(issueBookDto.bookId, { issuedTo: issueBookDto.userId }, { new: true }).exec();
    }
    async viewIssuedBooks(userId) {
        const user = await this.userModel.findById(userId).populate('issuedBooks');
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${userId} not found`);
        }
        return user.issuedBooks;
    }
    async transferBook(bookId, fromUserId, toUserId) {
        const fromUser = await this.userModel.findById(fromUserId);
        const toUser = await this.userModel.findById(toUserId);
        const book = await this.bookModel.findById(bookId);
        if (!fromUser || !toUser) {
            throw new common_1.NotFoundException('User not found');
        }
        if (!book || !fromUser.issuedBooks.some(book => book.toString() === bookId)) {
            throw new common_1.NotFoundException('Book not found or not issued to the user');
        }
        fromUser.issuedBooks = fromUser.issuedBooks.filter(b => b.toString() !== bookId);
        await fromUser.save();
        toUser.issuedBooks.push(new mongoose_3.Types.ObjectId(bookId));
        await toUser.save();
        return { message: 'Book transferred successfully' };
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_schema_1.Book.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], BooksService);
//# sourceMappingURL=books.service.js.map