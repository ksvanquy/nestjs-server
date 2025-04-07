import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './schemas/role.schema';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    private permissionsService: PermissionsService,
  ) {}

  async create(name: string, permissionIds: string[]): Promise<Role> {
    const createdRole = new this.roleModel({
      name,
      permissions: permissionIds,
    });
    return createdRole.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().populate('permissions').exec();
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).populate('permissions').exec();
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleModel.findOne({ name }).populate('permissions').exec();
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    return role;
  }

  async addPermissions(roleId: string, permissionIds: string[]): Promise<Role> {
    const role = await this.roleModel
      .findByIdAndUpdate(
        roleId,
        { $addToSet: { permissions: { $each: permissionIds } } },
        { new: true },
      )
      .populate('permissions')
      .exec();
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    return role;
  }

  async removePermissions(roleId: string, permissionIds: string[]): Promise<Role> {
    const role = await this.roleModel
      .findByIdAndUpdate(
        roleId,
        { $pull: { permissions: { $in: permissionIds } } },
        { new: true },
      )
      .populate('permissions')
      .exec();
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    return role;
  }

  async updatePermissions(roleId: string, permissionIds: string[]): Promise<Role> {
    const role = await this.roleModel
      .findByIdAndUpdate(
        roleId,
        { permissions: permissionIds },
        { new: true },
      )
      .populate('permissions')
      .exec();
    
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }
    return role;
  }
} 