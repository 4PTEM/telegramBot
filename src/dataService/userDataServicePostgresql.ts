import { Pool } from 'pg';
import { User } from '../types';
import { UserServiceInterface } from './interface';

new Pool({
    host: 'localhost',
    user: 'postgres'
});

export class UserService implements UserServiceInterface {
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
        (await this.pool.query('UPDATE users SET '))
    }
    async deleteUser(user_id: string): Promise<void> {

    }
}