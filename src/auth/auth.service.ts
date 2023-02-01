import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, SignUpDto } from './dto/user-auth.dto';
import {
  InjectModel
} from '@nestjs/mongoose';
import {
  Model
} from 'mongoose';
import {
  User,
  UserDocument
} from '../schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }


  login(createAuthDto: LoginDto) {
    const { email, pasword } = createAuthDto
    try {
      return this.userModel.findOne({ email })
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async signup(createAuthDto: SignUpDto) {
    // const { name, email, pasword } = createAuthDto
    try {
      const result = await this.userModel.create(createAuthDto)
      return result
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  currentUser() {
    return `This action returns a auth`;
  }


}
