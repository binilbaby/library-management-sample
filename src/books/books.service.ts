import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import axios from 'axios';
import { Book } from '../books/schemas/book.schema';
import { User } from '../users/schemas/user.schema';
import { CreateBookDto } from '../common/dto/create-book.dto';
import { Types } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>,
   @InjectModel(User.name) private userModel: Model<User>,) {}

  // Fetch book information using a third-party API by ISBN and create the book
  async addBookByISBN(isbn: string): Promise<Book> {
    const googleBooksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

    try {
      // Fetch the book data from Google Books API
      const response = await axios.get(googleBooksApiUrl);

      if (!response.data.items || response.data.items.length === 0) {
        throw new NotFoundException(`No book found with ISBN ${isbn}`);
      }

      // Extract book information from the API response
      const bookData = response.data.items[0].volumeInfo;
      const createBookDto: CreateBookDto = {
        title: bookData.title,
        author: bookData.authors ? bookData.authors.join(', ') : 'Unknown Author',
        publishedDate: bookData.publishedDate || 'Unknown',
        isbn: isbn,
        description: bookData.description || 'No description available',
        thumbnail: bookData.imageLinks?.thumbnail || 'No thumbnail available',
      };

      // Save the book to the database
      const createdBook = new this.bookModel(createBookDto);
      return await createdBook.save();
    } catch (error) {
      throw new BadRequestException('Failed to add book using ISBN.');
    }
  }
  async getAllBooks(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async issueBook(issueBookDto): Promise<Book> {
    console.log("Update Book")
    return this.bookModel.findByIdAndUpdate(
      issueBookDto.bookId, 
      { issuedTo: issueBookDto.userId }, 
      { new: true }
    ).exec();
  }

  // Method to view all books issued to a user (Staff or Student)
  async viewIssuedBooks(userId: string) {
    const user = await this.userModel.findById(userId).populate('issuedBooks');
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return user.issuedBooks;
  }

  // Method to transfer a book (Staff only)
  async transferBook(bookId: string, fromUserId: string, toUserId: string) {
    const fromUser = await this.userModel.findById(fromUserId);
    const toUser = await this.userModel.findById(toUserId);
    const book = await this.bookModel.findById(bookId);
  
    if (!fromUser || !toUser) {
      throw new NotFoundException('User not found');
    }
  
    if (!book || !fromUser.issuedBooks.some(book => book.toString() === bookId)) {
      throw new NotFoundException('Book not found or not issued to the user');
    }
  
    // Remove book from the current user
    fromUser.issuedBooks = fromUser.issuedBooks.filter(b => b.toString() !== bookId);
    await fromUser.save();
  
    // Add book to the new user
    toUser.issuedBooks.push(new Types.ObjectId(bookId));
  await toUser.save();
  
    return { message: 'Book transferred successfully' };
  }
  
}

