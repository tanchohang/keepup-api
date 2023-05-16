import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from 'apps/chat/src/chat.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { PartiesModule } from './parties/parties.module';
import { CirclesModule } from './circles/circles.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    ChatModule,
    ActivitiesModule,
    CirclesModule,
    PartiesModule,
    MongooseModule.forRoot(process.env.MONGO_URI),
    MessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
