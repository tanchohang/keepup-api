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
import { MessageGateway } from './message.gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatGateway } from './chat.gateway';
import { Online, OnlineSchema } from './entities/online.entity';
import { OnlineService } from './online.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    CirclesModule,
    MessagesModule,
    MongooseModule.forFeature([{ name: Party.name, schema: PartySchema }]),
    MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    MongooseModule.forFeature([{ name: Online.name, schema: OnlineSchema }]),
  ],
  controllers: [PartiesController],
  providers: [
    PartiesService,
    MessagesService,
    MessageGateway,
    ChatGateway,
    OnlineService,
  ],
  exports: [PartiesService],
})
export class PartiesModule {}
