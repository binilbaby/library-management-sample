import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateBookDto } from '../common/dto/create-book.dto';
import { IssueBookDto } from '../common/dto/issue-book.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Books') // Grouping the endpoints under "Books" in Swagger
@ApiBearerAuth() // Adds JWT Bearer Authentication requirement to this controller
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('add')
  @Roles('librarian')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Add a new book to the library (Librarian only)' })
  @ApiResponse({ status: 201, description: 'Book successfully added.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.addBook(createBookDto);
  }

  @Post('issue')
  @Roles('librarian')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Issue a book to a user (Librarian only)' })
  @ApiResponse({ status: 201, description: 'Book successfully issued.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async issueBook(@Body() issueBookDto: IssueBookDto) {
    return this.booksService.issueBook(issueBookDto);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all books in the library' })
  @ApiResponse({ status: 200, description: 'List of all books.' })
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }
}


// import { CreateBookDto, IssueBookDto } from '../common/dto';

// @Controller('books')
// export class BooksController {
//   constructor(private booksService: BooksService) {}

//   @Roles('librarian')
//   @UseGuards(RolesGuard)
//   @Post('add')
//   async addBook(@Body() createBookDto: CreateBookDto) {
//     return this.booksService.addBook(createBookDto);
//   }

//   @Roles('librarian')
//   @UseGuards(RolesGuard)
//   @Post('issue')
//   async issueBook(@Body() issueBookDto: IssueBookDto) {
//     return this.booksService.issueBook(issueBookDto);
//   }

//   @Get('all')
//   async getAllBooks() {
//     return this.booksService.getAllBooks();
//   }
// }
