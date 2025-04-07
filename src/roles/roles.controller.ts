import { Controller, Get, Post, Body, Param, Put, Patch } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './schemas/role.schema';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(
    @Body('name') name: string,
    @Body('permissionIds') permissionIds: string[],
  ): Promise<Role> {
    return this.rolesService.create(name, permissionIds);
  }

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Put(':id/permissions')
  @Patch(':id/permissions')
  async addPermissions(
    @Param('id') id: string,
    @Body('permissionIds') permissionIds: string[],
  ): Promise<Role> {
    return this.rolesService.addPermissions(id, permissionIds);
  }

  @Put(':id/permissions/remove')
  @Patch(':id/permissions/remove')
  async removePermissions(
    @Param('id') id: string,
    @Body('permissionIds') permissionIds: string[],
  ): Promise<Role> {
    return this.rolesService.removePermissions(id, permissionIds);
  }

  @Put(':id/permissions/update')
  @Patch(':id/permissions/update')
  async updatePermissions(
    @Param('id') id: string,
    @Body('permissionIds') permissionIds: string[],
  ): Promise<Role> {
    return this.rolesService.updatePermissions(id, permissionIds);
  }
} 