import { UserService } from "src/service/user-service";
import { TodoService } from "src/service/todo-service";

export type AppContext = {
  userService: UserService;
  todoService: TodoService;
};
