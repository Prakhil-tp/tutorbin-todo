import { ServiceContext, TTodo } from "../types";

export class TodoService {
  context!: ServiceContext;

  constructor(serviceContext: ServiceContext) {
    this.context = serviceContext;
  }

  public async getTodo() {
    return this.context.todoRepository.get();
  }

  public async addTodo(data: TTodo) {
    return this.context.todoRepository.save(data);
  }

  public async updateTodo(id: string, data: TTodo) {
    return this.context.todoRepository.update(id, data);
  }

  public async removeTodo(id: string) {
    return this.context.todoRepository.remove(id);
  }
}
