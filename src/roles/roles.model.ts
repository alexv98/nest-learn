import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {UserRoles} from "../user-roles.model";

interface UserCreationProps {
  value: string,
  description: string
}

@Table({tableName: 'roles'})
export class Role extends Model<Role, UserCreationProps> {

  @ApiProperty({example: '1', description: 'Unique id'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({example: 'ADMIN', description: 'Unique role value'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: number;

  @ApiProperty({example: 'administrator', description: 'Role description'})
  @Column({type: DataType.STRING, allowNull: false})
  description: number;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[]
}
