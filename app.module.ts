import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule
import { MongooseModule } from '@nestjs/mongoose';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // Makes the ConfigModule globally available
      envFilePath: '.env',  // Specifies the path to the .env file
    }),
    MongooseModule.forRoot(process.env.MONGO_URI), // Connect to MongoDB using MONGO_URI from .env
    BooksModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
