import { Pool } from 'pg';
import { ExpenseDataServiceInteface } from '../interface';

export class ExpenseDataService implements ExpenseDataServiceInteface{
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }
}