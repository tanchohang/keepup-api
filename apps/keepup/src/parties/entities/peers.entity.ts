import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Peer {
  @Prop({ type: Array })
  offerCandidates: [string];
  @Prop({ type: Array })
  answerCandidates: [string];
}

export const PeerSchema = SchemaFactory.createForClass(Peer);
