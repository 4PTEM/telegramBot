import { Collection, Db, MongoClient } from 'mongodb';
import { User } from '../types';
import { UserServiceInterface } from './interface';

const client = new MongoClient('mongodb://localhost:27017/');
export class UserService implements UserServiceInterface {
    private db?: Db;
    private userCollection?: Collection<User>;
    constructor(client: MongoClient, database: string, usercollection: string) {
        client.connect().then(() => {
            this.db = client.db(database);
            this.userCollection = this.db.collection(usercollection);
        }, (e) => {
            throw e;
        });
    }

    async createUser(user: User): Promise<User> {
        if (!this.userCollection) throw new Error('No connection');
        await this.userCollection.insertOne(user);
        return user;
    }

    async getUser(user_id: string): Promise<User | null> {
        if (!this.userCollection) throw new Error('No connection');
        return await this.userCollection.findOne({ user_id });
    }

    async updateUser(user_id: string, user: User): Promise<void> {
        if (!this.userCollection) throw new Error('No connection');
        await this.userCollection.replaceOne({ user_id }, user);
    }

    async deleteUser(user_id: string): Promise<void> {
        if (!this.userCollection) throw new Error('No connection');
        await this.userCollection.deleteOne({ user_id });
    }
}