import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Circle } from '../../circles/entities/circle.entity';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Party {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  circle: Circle;
}

export const PartySchema = SchemaFactory.createForClass(Party);
