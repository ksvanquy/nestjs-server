import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, PermissionDocument } from './schemas/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}

  async create(action: string): Promise<Permission> {
    const createdPermission = new this.permissionModel({ action });
    return createdPermission.save();
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionModel.find().exec();
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionModel.findById(id).exec();
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${id} not found`);
    }
    return permission;
  }

  async findByAction(action: string): Promise<Permission> {
    const permission = await this.permissionModel.findOne({ action }).exec();
    if (!permission) {
      throw new NotFoundException(`Permission with action ${action} not found`);
    }
    return permission;
  }
} 