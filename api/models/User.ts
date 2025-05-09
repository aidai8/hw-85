import mongoose, {HydratedDocument, Model} from "mongoose";
import {UserFields} from "../types";
import {randomUUID} from "node:crypto";
import argon2 = require("argon2");

interface UserMethods {
    checkPassword: (password: string) => Promise<boolean>;
    generateToken(): void;
}

const ARGON2_OPTIONS = {
    type: argon2.argon2id,
    memoryCoast: 2 ** 16,
    timeCoast: 5,
    parallelism: 1,
}

type UserModel = Model<UserFields, {}, UserMethods>;

const UserSchema = new mongoose.Schema<
    HydratedDocument<UserFields>,
    UserModel,
    UserMethods,
    {}
>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(value: string):Promise<boolean> {
                if (!this.isModified('username')) return true;
                const user: HydratedDocument<UserFields> | null = await User.findOne({ username: value });
                return !user;
            },
            message: "This username is already taken"
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin"],
    },
    token: {
        type: String,
        required: true,
    }
});

UserSchema.methods.checkPassword = async function (password: string) {
    return await argon2.verify(this.password, password);
}

UserSchema.methods.generateToken = function () {
    this.token = randomUUID();
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await argon2.hash(this.password, ARGON2_OPTIONS);
    next();
});

UserSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model("User", UserSchema);
export default User;