import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { IssueBookDto } from '../common/dto/issue-book.dto';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse ,ApiBody} from '@nestjs/swagger';  


@ApiTags('Books') // Grouping the endpoints under "Books" in Swagger
@ApiBearerAuth() // Adds JWT Bearer Authentication requirement to this controller
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('add')
  @Roles('librarian')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Add a new book to the library using ISBN (Librarian only)' })
  @ApiResponse({ status: 201, description: 'Book successfully added using ISBN.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
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
  }) // This decorator describes the body parameter in Swagger
  async addBook(@Body('isbn') isbn: string) {
    return this.booksService.addBookByISBN(isbn);
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

  // Staff & Students: View all books issued to them
  @Get('issued')
  @Roles('staff', 'student')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'View all books issued to the current user (Staff/Student)' })
  @ApiResponse({ status: 200, description: 'List of issued books.' })
  async viewIssuedBooks(@Body('userId') userId: string) {
    return this.booksService.viewIssuedBooks(userId);
  }

  // Staff: Transfer books to another student or staff member
  @Post('transfer')
  @Roles('staff')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Transfer a book to another student or staff (Staff only)' })
  @ApiResponse({ status: 200, description: 'Book successfully transferred.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async transferBook(
    @Body('bookId') bookId: string,
    @Body('toUserId') toUserId: string,
    @Body('fromUserId') fromUserId: string
  ) {
    return this.booksService.transferBook(bookId, fromUserId, toUserId);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all books in the library' })
  @ApiResponse({ status: 200, description: 'List of all books.' })
  async getAllBooks() {
    return this.booksService.getAllBooks();
  }
}
