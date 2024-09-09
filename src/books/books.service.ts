import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async addBook(createBookDto): Promise<Book> {
    const book = new this.bookModel(createBookDto);
    return book.save();
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
}
