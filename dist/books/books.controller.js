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
exports.BooksController = void 0;
const common_1 = require("@nestjs/common");
const books_service_1 = require("./books.service");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const issue_book_dto_1 = require("../common/dto/issue-book.dto");
const swagger_1 = require("@nestjs/swagger");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async addBook(isbn) {
        return this.booksService.addBookByISBN(isbn);
    }
    async issueBook(issueBookDto) {
        return this.booksService.issueBook(issueBookDto);
    }
    async viewIssuedBooks(userId) {
        return this.booksService.viewIssuedBooks(userId);
    }
    async transferBook(bookId, toUserId, fromUserId) {
        return this.booksService.transferBook(bookId, fromUserId, toUserId);
    }
    async getAllBooks() {
        return this.booksService.getAllBooks();
    }
};
exports.BooksController = BooksController;
__decorate([
    (0, common_1.Post)('add'),
    (0, roles_decorator_1.Roles)('librarian'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Add a new book to the library using ISBN (Librarian only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Book successfully added using ISBN.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                isbn: {
                    type: 'string',
                    example: '9780140328721',
                    description: 'The ISBN number of the book to be added',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)('isbn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "addBook", null);
__decorate([
    (0, common_1.Post)('issue'),
    (0, roles_decorator_1.Roles)('librarian'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Issue a book to a user (Librarian only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Book successfully issued.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_book_dto_1.IssueBookDto]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "issueBook", null);
__decorate([
    (0, common_1.Get)('issued'),
    (0, roles_decorator_1.Roles)('staff', 'student'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'View all books issued to the current user (Staff/Student)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of issued books.' }),
    __param(0, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "viewIssuedBooks", null);
__decorate([
    (0, common_1.Post)('transfer'),
    (0, roles_decorator_1.Roles)('staff'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Transfer a book to another student or staff (Staff only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Book successfully transferred.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)('bookId')),
    __param(1, (0, common_1.Body)('toUserId')),
    __param(2, (0, common_1.Body)('fromUserId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "transferBook", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all books in the library' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all books.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BooksController.prototype, "getAllBooks", null);
exports.BooksController = BooksController = __decorate([
    (0, swagger_1.ApiTags)('Books'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('books'),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BooksController);
//# sourceMappingURL=books.controller.js.map