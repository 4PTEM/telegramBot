import { Pool } from 'pg';
import { ExpenseDataServiceInterface } from '../interface';

export class ExpenseDataService implements ExpenseDataServiceInterface{
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }
}