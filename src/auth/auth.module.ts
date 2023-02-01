import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../schemas/user.schema';

const MODELS = [{
  name: User.name,
  schema: UserSchema
}]


@Module({
  imports: [MongooseModule.forFeature(MODELS)],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
