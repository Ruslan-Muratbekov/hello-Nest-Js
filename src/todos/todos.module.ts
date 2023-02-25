import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from "@nestjs/mongoose";
import { TodosSchema, TodoSchema } from "./schemas/user.schema";

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [
    MongooseModule.forFeature([{ name: TodosSchema.name, schema: TodoSchema }]),
  ],
})
export class TodosModule {}
