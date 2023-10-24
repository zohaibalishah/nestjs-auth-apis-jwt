import {
    Schema,
    SchemaFactory,
    Prop
} from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema({
    timestamps: true,
})


export class User {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true, select: false })
    password: string;

    comparePassword: (candidatePassword: string) => Promise<boolean>;
}


export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: Function) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});


UserSchema.method("comparePassword", async function (candidatePassword: string): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password)
    } catch (error) {
        throw new Error("some  thing  wrrrong in the " + error)
    }

})

