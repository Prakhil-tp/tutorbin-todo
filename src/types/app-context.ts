import { UserService } from "../services/user-service";
import { TodoService } from "../services/todo-service";

export type AppContext = {
  userService: UserService;
  todoService: TodoService;
};
