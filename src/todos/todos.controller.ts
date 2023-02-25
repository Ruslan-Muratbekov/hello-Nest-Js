import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { Request } from "express";
import { AccessTokenGuard } from "../common/guards/accessToken.guard";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Controller("todos")
export class TodosController {
  constructor(private readonly todosService: TodosService) {
  }

  @UseGuards(AccessTokenGuard)
  @Get("all")
  async getAll(@Req() req: Request) {
    const userId = req.user['sub']
    return await this.todosService.getAll(userId)
  }

  @UseGuards(AccessTokenGuard)
  @Post("create")
  async createTodo(@Body() body: CreateTodoDto, @Req() req: Request) {
    const userId = req.user['sub']
    return await this.todosService.createTodo(userId, body)
  }

}
