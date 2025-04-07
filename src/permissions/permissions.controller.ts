import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './schemas/permission.schema';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async create(@Body('action') action: string): Promise<Permission> {
    return this.permissionsService.create(action);
  }

  @Get()
  async findAll(): Promise<Permission[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findOne(id);
  }
} 