import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Circle } from '../../circles/entities/circle.entity';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';
@Schema({ timestamps: true })
export class Party {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  circle: Circle;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }])
  users: User[];
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  creator: User;
}

export const PartySchema = SchemaFactory.createForClass(Party);
