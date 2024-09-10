import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book, BookSchema } from './schemas/book.schema';
import { User, UserSchema } from '../users/schemas/user.schema';  
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),// Register  book model
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),  // Register user model
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
