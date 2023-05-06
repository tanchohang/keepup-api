import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Peer } from './entities/peers.entity';

@Injectable()
export class PeerService {
  constructor(@InjectModel(Peer.name) private peerModel: Model<Peer>) {}

  async createPeer() {
    return await this.peerModel.create({
      offerCandidates: null,
      answerCandidates: null,
    });
  }
  async addOffer(id: string, offerCandidates: any) {
    return await this.peerModel.findByIdAndUpdate(id, { offerCandidates });
  }

  async addAnswer(id: string, answerCandidates: string) {
    return await this.peerModel.findByIdAndUpdate(id, { answerCandidates });
  }

  async removePeer(id: string) {
    return await this.peerModel.findByIdAndDelete(id);
  }
}
