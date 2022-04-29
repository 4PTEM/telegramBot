import { CategoryControllerInterface, ControllerInterface, ExpenseControllerInterface, UserControllerInterface } from './interface';


export class Controller implements ControllerInterface{
    userController: UserControllerInterface;
    categoryController: CategoryControllerInterface;
    expenseController: ExpenseControllerInterface;

    constructor (userController: UserControllerInterface, categoryController: CategoryControllerInterface, expenseController: ExpenseControllerInterface){
        this.userController = userController;
        this.categoryController = categoryController;
        this.expenseController = expenseController;
    }
}