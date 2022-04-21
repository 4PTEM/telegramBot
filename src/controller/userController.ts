import { UserDataServiceInterface } from '../dataService/interface';
import { InputMessage, User } from '../types';
import { UserControllerInterface } from './interface';
export class UserController implements UserControllerInterface {
    UserDataService: UserDataServiceInterface
    constructor(UserDataService: UserDataServiceInterface) {
        this.UserDataService = UserDataService;
    }
}