import { ApiProperty } from '@nestjs/swagger';

export class IssueBookDto {
  @ApiProperty({ example: 'book_id_123' })
  bookId: string;

  @ApiProperty({ example: 'user_id_456' })
  userId: string;
}
