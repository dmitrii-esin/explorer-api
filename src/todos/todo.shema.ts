import { EntitySchema } from 'typeorm';
import { Todo } from './todo.entity';

export const TodoSchema = new EntitySchema<Todo>({
  name: 'Todo',
  target: Todo,
  columns: {
    id: {
      type: String,
      primary: true,
      generated: true,
    },
    text: {
      type: String,
    },
  },
  //TODO:!! в будущем тут будут юзеры (наверное), т.к. туду связаны с юзерами как o2m\m2o
  // relations: {
  //   users: {
  //     type: 'one-to-many',
  //     target: 'User', // the name of the UserSchema
  //   },
  // },
});
