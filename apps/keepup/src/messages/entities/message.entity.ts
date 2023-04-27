import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Party } from 'apps/keepup/src/parties/entities/party.entity';
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
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  party: Party;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
