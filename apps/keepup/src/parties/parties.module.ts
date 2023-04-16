import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './entities/party.entity';
import { CirclesModule } from '../circles/circles.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    CirclesModule,
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService],
})
export class PartiesModule {}
