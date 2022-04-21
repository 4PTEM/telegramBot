import { UserDataServiceInterface } from '../../dataService/interface';
import { UserControllerInterface } from '../interface';

export class UserController implements UserControllerInterface {
    userDataService: UserDataServiceInterface
    constructor(UserDataService: UserDataServiceInterface) {
        this.userDataService = UserDataService;
    }
}