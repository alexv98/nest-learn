import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRollDto} from "./dto/create-roll.dto";

@Controller('roles')
export class RolesController {

  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRollDto) {
    return this.rolesService.createRoll(dto);
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.rolesService.getRollByValue(value);
  }

}
