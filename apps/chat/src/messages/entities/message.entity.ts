import { Prop, Schema } from '@nestjs/mongoose';
import { Party } from 'apps/keepup/src/parties/entities/party.entity';
import { User } from 'apps/keepup/src/users/entities/user.entity';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ type: String, required: true })
  message: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  user: User;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  party: Party;
}
