

import  User from "../model/user.model"
import {UserDto} from "../dto/user.dto";


export const getAllUsers= async ():Promise<UserDto[]>  => {
    return User.find();
}


export const saveUser = async (user : UserDto) : Promise<UserDto> => {
    return  User.create(user)
}



export const getUserById = async (id : string): Promise<UserDto | null> => {
    return User.findOne({id :id});
}




export const updateUser = async (id : string , data : UserDto) => {
    const user = await User.findOneAndUpdate({id :id} , data , {new :true})
    if(!user){
        return null
    }
    return user
}



export const deleteUser = async (id : string) => {
    await User.deleteOne({id :id});
    return true;
}



export const validateUser = (user : UserDto) => {
    if( !user.name || !user.email || !user.password || !user.role){
        return "All fields are required !!"
    }
    return null;
}
