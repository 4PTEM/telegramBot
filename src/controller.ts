import { Pool } from 'pg';
import { CategoryController } from './controller/basicControllers/categoryController';
import { ExpenseController } from './controller/basicControllers/expenseController';
import { UserController } from './controller/basicControllers/userController';
import { Controller } from './controller/controller';
import { CategoryDataService } from './dataService/postgresql/categoryDataService';
import { ExpenseDataService } from './dataService/postgresql/expenseDataService';
import { UserDataService } from './dataService/postgresql/userDataService';

//declaration of data services for postgresql
const pool = new Pool();

const userDataService = new UserDataService(pool);
const categoryDataService = new CategoryDataService(pool);
const expenseDataService = new ExpenseDataService(pool);

//declaration of controllers for each entity and main controller
const userController = new UserController(userDataService);
const categoryController = new CategoryController(categoryDataService);
const expenseController = new ExpenseController(expenseDataService);

const controller = new Controller(userController, categoryController, expenseController);

export default controller;