import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  author: string;

  @ApiProperty({ example: '9780743273565' })
  isbn: string;
}

  