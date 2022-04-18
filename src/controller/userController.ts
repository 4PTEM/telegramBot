import { UserServiceInterface } from '../dataService/interface';
import { InputMessage, User } from '../types';
import { UserControllerInterface } from './interface';
class UserController implements UserControllerInterface {
    userService: UserServiceInterface
    constructor(userService: UserServiceInterface) {
        this.userService = userService;
    }

    async addCategories(message: InputMessage): Promise<void> {
        const text = message.text
        const chat_id = message.chat.id;
        const categories = text.split(', ');
        let user = await this.userService.getUser(chat_id);
        if(!user) user = await this.userService.createUser({user_id: chat_id, expenses: [], created_at: Date.now().toString()})
        categories.forEach(category => {
            user?.expenses.push({ category, last_week: 0, total: 0, weeks_count: 0 });
        })
        await this.userService.updateUser(chat_id, user);
    }
}