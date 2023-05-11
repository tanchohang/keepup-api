import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Peer } from './entities/peers.entity';

@Injectable()
export class PeerService {
  constructor(@InjectModel(Peer.name) private peerModel: Model<Peer>) {}

  async createPeer(perrCon: {
    offer: any;
    answer?: any;
    party: string;
    offerCandidates?: any;
    answerCandidates?: any;
  }) {
    const peer = await this.peerModel.create(perrCon);
    return peer;
  }

  async addAnswer(id: string, answer: any) {
    return await this.peerModel.findOneAndUpdate(
      { party: id },
      { answer },
      { new: true },
    );
  }

  async addOfferCandidates(id: string, offerCandidates: any) {
    return await this.peerModel.findOneAndUpdate(
      { party: id },
      {
        offerCandidates,
      },
      { new: true },
    );
  }

  async addAnswerCanditates(id: string, answerCandidates: any) {
    return await this.peerModel.findOneAndUpdate(
      { party: id },
      { answerCandidates },
      { new: true },
    );
  }

  async removePeer(id: string) {
    if (await this.peerModel.findOne({ party: id }))
      return await this.peerModel.findOneAndDelete({ party: id });
  }
}
