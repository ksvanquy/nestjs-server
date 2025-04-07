import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema()
export class Permission {
  @Prop({ required: true, unique: true })
  action: string; // e.g., 'create:user', 'read:user', 'update:user', 'delete:user'
}

export const PermissionSchema = SchemaFactory.createForClass(Permission); 