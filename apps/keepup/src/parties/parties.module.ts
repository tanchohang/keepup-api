import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesController } from './parties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Party, PartySchema } from './entities/party.entity';
import { CirclesModule } from '../circles/circles.module';
import { UsersModule } from '../users/users.module';
import { MessagesService } from '../messages/messages.service';
import { MessagesModule } from '../messages/messages.module';
import { Message, MessageSchema } from '../messages/entities/message.entity';

@Module({
  imports: [
    UsersModule,
    CirclesModule,
    MessagesModule,
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  controllers: [PartiesController],
  providers: [PartiesService, MessagesService],
  exports: [PartiesService],
})
export class PartiesModule {}
