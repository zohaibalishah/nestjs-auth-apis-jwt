import { PartialType } from '@nestjs/mapped-types';

export class LoginDto {
    readonly email: string
    readonly pasword: string
}


export class SignUpDto extends PartialType(LoginDto) {
    name: string
}
