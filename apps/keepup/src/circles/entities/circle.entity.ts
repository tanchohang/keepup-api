import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';

/*
Cirlce:
- Deleting must be done with voting system
*/
@Schema({ timestamps: true })
export class Circle extends Document {
  @Prop({ type: String, required: true })
  name: string;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]) //TODO:must have creator
  users: User[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }) //TODO:must have creator
  creator: User;
}

export const CircleSchema = SchemaFactory.createForClass(Circle);
