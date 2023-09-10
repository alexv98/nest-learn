import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({example: 'user@mail.ru', description: 'Unique email'})
  readonly email: string;

  @ApiProperty({example: 'myPassword123', description: 'password'})
  readonly password: string;
}
