import { User } from '../types';
export interface UserServiceInterface {
    createUser(user: User): Promise<User>;
    getUser(user_id: string): Promise<User | null>;
    updateUser(user_id: string, user: User): Promise<void>;
    deleteUser(user_id: string): Promise<void>;
}