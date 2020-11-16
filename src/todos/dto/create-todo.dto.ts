import { IsString } from 'class-validator';
export class CreateTodoDto {
  @IsString()
  id: string;

  @IsString()
  text: string;
}
