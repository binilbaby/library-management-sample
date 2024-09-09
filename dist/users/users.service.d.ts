import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findByEmail(email: string): Promise<User | undefined>;
    createUser(createUserDto: any): Promise<User>;
    getUsersByRole(role: string): Promise<User[]>;
}
