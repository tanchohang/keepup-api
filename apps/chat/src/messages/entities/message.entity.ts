import { Prop, Schema } from '@nestjs/mongoose';
import { User } from 'apps/keepup/src/users/entities/user.entity';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: String, required: true })
  message: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: User;
}
