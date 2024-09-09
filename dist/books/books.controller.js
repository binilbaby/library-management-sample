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
const create_book_dto_1 = require("../common/dto/create-book.dto");
const issue_book_dto_1 = require("../common/dto/issue-book.dto");
const swagger_1 = require("@nestjs/swagger");
let BooksController = class BooksController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async addBook(createBookDto) {
        return this.booksService.addBook(createBookDto);
    }
    async issueBook(issueBookDto) {
        return this.booksService.issueBook(issueBookDto);
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
    (0, swagger_1.ApiOperation)({ summary: 'Add a new book to the library (Librarian only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Book successfully added.' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
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