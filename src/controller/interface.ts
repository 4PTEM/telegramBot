import { InputMessage } from '../types';

export interface UserControllerInterface {

}

export interface CategoryControllerInterface {

}
export interface ExpenseControllerInterface {

}
export interface ControllerInterface {
    userController: UserControllerInterface,
    categoryController: CategoryControllerInterface,
    expenseController: ExpenseControllerInterface
}