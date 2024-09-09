import { UsersService } from './users.service';
import { CreateUserDto } from '../common/dto/create-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(createUserDto: CreateUserDto): Promise<import("./schemas/user.schema").User>;
    getUsersByRole(role: string): Promise<import("./schemas/user.schema").User[]>;
}
