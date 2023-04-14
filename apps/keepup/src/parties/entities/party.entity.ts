import { Prop, Schema } from '@nestjs/mongoose';
import { Circle } from '../../circles/entities/circle.entity';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Party {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  circle: Circle;
}
