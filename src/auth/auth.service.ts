import {Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs'
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}


  async login(dto: CreateUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async reg(dto: CreateUserDto) {
    const cand = await this.userService.getUserByEmail(dto.email);
    if(cand) {
      throw new HttpException('User with this email already exist', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userService.createUser({...dto, password: hashPassword});
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {email: user.email, id: user.id, role: user.roles};
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    const passwordEquals = await bcrypt.compare(dto.password, user.password);
    if(user && passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({message: 'Incorrect email or password'});
  }
}
