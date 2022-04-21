import { Pool } from 'pg';
import { UserDataService } from './dataService/postgresql/userDataService';

const UserDataService = new UserDataService(new Pool());
