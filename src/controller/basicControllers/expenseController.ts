import { ExpenseDataServiceInterface } from '../../dataService/interface';
import { ExpenseControllerInterface } from '../interface';

export class ExpenseController implements ExpenseControllerInterface {
    expenseDataService: ExpenseDataServiceInterface
    constructor(expenseDataService: ExpenseDataServiceInterface) {
        this.expenseDataService = expenseDataService;
    }
}