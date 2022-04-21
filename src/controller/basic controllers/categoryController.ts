import { CategoryDataServiceInterface } from '../../dataService/interface';
import { CategoryControllerInterface } from '../interface';

export class CategoryController implements CategoryControllerInterface {
    categoryDataService: CategoryDataServiceInterface
    constructor(CategoryDataService: CategoryDataServiceInterface) {
        this.categoryDataService = CategoryDataService;
    }
}