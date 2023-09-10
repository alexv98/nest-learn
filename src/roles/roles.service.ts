import { Injectable } from '@nestjs/common';
import {CreateRollDto} from "./dto/create-roll.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRoll(dto: CreateRollDto) {
    const role = await this.roleRepository.create(dto);
    return role;
  }

  async getRollByValue(value: string) {
    const role = await this.roleRepository.findOne({where: {value}});
    return role;
  }
}
