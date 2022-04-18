import { InputMessage } from '../types';

export interface UserControllerInterface {
    addCategories(message: InputMessage): Promise<void>;
    /*
    getUserExpances(user_id: string): Promise<Record<string, any>>;
    setUserExpances(user_id:string, expances: Record<string, number>): Promise<void>;
    updateUserExpances(user_id: string, expances: Record<string, number>): Promise<void>;
    addUserExpances(user_id: string, expances: Record<string, number>): Promise<void>;
    deleteUserExpances(user_id: string, expances: Record<string, number>): Promise<void>;
    */
}