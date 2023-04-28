import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Online } from './entities/online.entity';
import { Model } from 'mongoose';

@Injectable()
export class OnlineService {
  constructor(@InjectModel(Online.name) private onlineModel: Model<Online>) {}
  async addUser(user: string, client: string) {
    return await this.onlineModel.create({ user, client });
  }

  async removeUser(user: string) {
    return await this.onlineModel.deleteOne({ user });
  }
}
