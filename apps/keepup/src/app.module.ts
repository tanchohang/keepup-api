import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from 'apps/chat/src/chat.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { PartiesModule } from './parties/parties.module';
import { CirclesModule } from './circles/circles.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    ChatModule,
    ActivitiesModule,
    CirclesModule,
    PartiesModule,
    MongooseModule.forRoot(
      process.env.MONGO_URI,
      // 'mongodb://root:example@localhost:27017/keepup?authSource=admin',
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
