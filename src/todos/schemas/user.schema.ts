import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type TodoDocument = TodosSchema & mongoose.Document;

@Schema()
class Todo {
  @Prop({ type: String, required: true, unique: true })
  title: string;

  @Prop({ type: String, required: true })
  lorem: string;

  @Prop({ type: Boolean, default: false })
  completed: boolean;
}

@Schema()
export class TodosSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  userId: string;

  @Prop({type: [{...Todo}], default: []})
  todos: Todo[]
}

export const TodoSchema = SchemaFactory.createForClass(TodosSchema);
