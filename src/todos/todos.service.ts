import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { TodosSchema, TodoDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class TodosService {
  constructor(@InjectModel(TodosSchema.name) private readonly todoSchema: Model<TodoDocument>) {}

  async getAll(userId){
    const todos = await this.todoSchema.findOne({userId})
    console.log(todos);
    return 'Привет'
  }

  async createTodo(userId, body: CreateTodoDto){
    const userTodos = await this.todoSchema.findOne({userId})
    if(userTodos){
      userTodos.todos.push({...body, completed: false})
      return userTodos.save()
    }
    const createUserTodos = await this.todoSchema.create({userId, todos: [{...body, completed: false}]})
    return createUserTodos
  }
}
