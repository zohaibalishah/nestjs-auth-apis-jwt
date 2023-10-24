import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, SignUpDto } from './dto/user-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }


  async login(createAuthDto: LoginDto) {
    const { email, password } = createAuthDto
    try {
      const user = await this.userModel.findOne({ email }, "+password");
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      const isMatched = await user.comparePassword(password)
      if (!isMatched) {
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
      }
      const payload = { email: user.email, sub: user._id };
      return {
        user: this.filterData(user),
        access_token: this.jwtService.sign(payload)
      }
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async signup(createAuthDto: SignUpDto) {
    try {
      const { name, email, password } = createAuthDto
      const user = await this.userModel.findOne({ email });
      if (user) {
        throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
      }
      const result = await this.userModel.create(createAuthDto)
      return result

    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private filterData(result: UserDocument) {
    const user = result.toObject()
    delete user['password']
    return user
  }

}
