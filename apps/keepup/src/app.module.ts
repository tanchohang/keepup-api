import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ChatModule } from 'apps/chat/src/chat.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from 'apps/auth/src/auth.module';
import { CirclesModule } from './circles/circles.module';
import { PartiesModule } from './parties/parties.module';
import { CirclesModule } from './circles/circles.module';

@Module({
  imports: [UsersModule, AuthModule, ChatModule, ActivitiesModule, CirclesModule, PartiesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
