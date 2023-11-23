import {IUserSchema} from "@/models/user-model";

export interface IUserDto {
    email: string;
    id: string;
    isActivated: boolean;
}


export default class UserDto {
    email: IUserDto['email'];
    id: IUserDto['id'];
    isActivated: IUserDto['isActivated'];

    constructor(model: IUserSchema) {
        this.email = model.email;
        this.id = model._id.toString();
        this.isActivated = model.isActivated
    }
}