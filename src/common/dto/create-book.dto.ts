import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Hobbit',
  })
  title: string;

  @ApiProperty({
    description: 'Author of the book',
    example: 'J.R.R. Tolkien',
  })
  author: string;

  @ApiProperty({
    description: 'Published date of the book',
    example: '1937',
  })
  publishedDate: string;

  @ApiProperty({
    description: 'ISBN of the book',
    example: '9780140328721',
  })
  isbn: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'A fantasy novel about a hobbit’s adventure.',
  })
  description: string;

  @ApiProperty({
    description: 'Thumbnail of the book',
    example: 'https://example.com/thumbnail.jpg',
    required: false,
  })
  thumbnail?: string;
}
