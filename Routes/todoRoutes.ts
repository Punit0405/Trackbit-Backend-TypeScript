import express, { Request, Response } from "express";
import TodoClass from "../Controllers/TodoController";
import isLoggedin from "../Middlewares/isLoggedin";
import TodoValidator from "../Validations/todoValidator";

const TodoController = new TodoClass();
const validator = new TodoValidator();

class TodoRouter {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  private routes() {
    //Route for Adding Habbit
    this.router
      .route("/addtodo")
      .post(isLoggedin, validator.validateTodo, TodoController.addTodo);

    //Route for Fetching Todo
    this.router.route("/fetchtodo").get(isLoggedin, TodoController.fetchTodos);

    //Route for Updating Todo
    this.router
      .route("/updateTodo/:id")
      .put(isLoggedin, validator.validateTodo, TodoController.updateTodo);

    //Route for Deleting Todo
    this.router
      .route("/deleteTodo/:id")
      .delete(isLoggedin, TodoController.deleteTodo);
  }
}
export default TodoRouter;