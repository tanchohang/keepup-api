import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from 'apps/chat/src/chat.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { PartiesModule } from './parties/parties.module';
import { CirclesModule } from './circles/circles.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt.guard';

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
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
