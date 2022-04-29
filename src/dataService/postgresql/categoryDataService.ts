import { Pool } from 'pg';
import { CategoryDataServiceInterface } from '../interface';

export class CategoryDataService implements CategoryDataServiceInterface{
    private pool: Pool;
    constructor(pool: Pool) {
        this.pool = pool;
    }
}