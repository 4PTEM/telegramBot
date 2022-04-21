import { Pool } from 'pg';
import { User } from '../../types';
import { UserDataServiceInterface } from '../interface';

export class UserDataService implements UserDataServiceInterface {
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }
    async createUser(user: User): Promise<User> {
        this.pool.query('INSERT INTO users VALUES ($2, $3)', [Date.now(), Date.now()]);
        return user;
    }
    async getUser(user_id: string): Promise<User | null> {
        return (await this.pool.query('SELECT * FROM users WHERE id = $1', [user_id])).rows[0] as User | null;
    }
    async updateUser(user_id: string, user: User): Promise<void> {
        await this.pool.query('UPDATE users SET created_at = $1, last_message = $2 WHERE id = $3', [user.created_at, user.last_message, user_id]);
    }
    async deleteUser(user_id: string): Promise<void> {
        await this.pool.query('DELETE FROM user WHERE id = $1', [user_id]);
    }
}