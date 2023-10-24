import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

const MODELS = [{
  name: User.name,
  schema: UserSchema
}]


@Module({
  imports: [MongooseModule.forFeature(MODELS), JwtModule.register({
    secret: 'jwtConstants.secret',
    // signOptions: { expiresIn: '60s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
