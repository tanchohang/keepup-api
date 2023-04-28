import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Schema({ timestamps: true })
export class Online {
  @Prop({ type: String, required: true })
  client: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;
}

export const OnlineSchema = SchemaFactory.createForClass(Online);
