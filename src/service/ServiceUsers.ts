import users from "../model/Users.js"

const CreateUser = async (data: any) => {
    try {
        const newUser = new users(data);
        return await newUser.save();
    } catch (error) {
        
        console.error("Detailed error:", error); 
        
        if (error instanceof Error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
        throw new Error("Failed to create user");
    }
}

const GetUsers = async () => {
    try {
        return await users.find().lean();
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
}

const GetUserById = async (id: string) => {
    try {
        return await users.findById(id).lean();
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
}

const UpdateUserById = async (id: string, data: any) => {
    try {
        const updated = await users.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return updated;
    } catch (error) {
        throw new Error("Failed to update user");
    }
}

const DeleteUserById = async (id: string) => {
    try {
        return await users.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Failed to delete user");
    }
}

export { CreateUser, GetUsers, GetUserById, UpdateUserById, DeleteUserById }