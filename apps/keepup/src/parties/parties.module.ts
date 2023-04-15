import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './entities/party.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
})
export class PartiesModule {}
