import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Party } from './party.entity';

@Schema({ timestamps: true })
export class Peer {
  @Prop({ type: Object, required: true })
  offer: any;
  @Prop({ type: Object })
  answer: any;
  @Prop({ type: Array, default: [] })
  offerCandidates: [any];
  @Prop({ type: Array, default: [] })
  answerCandidates: [any];
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  party: Party;
}

export const PeerSchema = SchemaFactory.createForClass(Peer);
