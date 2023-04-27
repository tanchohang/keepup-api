import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'apps/keepup/src/users/entities/user.entity';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Message extends Document {
  @Prop({ type: String, required: true })
  text: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  sender: User;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
