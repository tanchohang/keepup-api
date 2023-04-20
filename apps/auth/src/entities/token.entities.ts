import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from 'apps/keepup/src/users/entities/user.entity';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Token extends Document {
  @Prop({ type: String, required: true })
  refreshToken: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  user: User;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
