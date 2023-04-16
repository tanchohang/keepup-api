import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';

/*
Cirlce:
- Deleting must be done with voting system
*/
@Schema({ timestamps: true })
export class Circle extends Document {
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }])
  users: User[];
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Circle' }])
  circles: Circle[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  creator: User;
}

export const CircleSchema = SchemaFactory.createForClass(Circle);
