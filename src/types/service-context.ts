import { UserRepository, TodoRepository } from "../repositories";

export type ServiceContext = {
  userRepository: UserRepository;
  todoRepository: TodoRepository;
};
