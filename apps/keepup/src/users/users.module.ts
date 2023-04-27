import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { AuthModule } from 'apps/auth/src/auth.module';
import { CirclesModule } from '../circles/circles.module';
import { CirclesService } from '../circles/circles.service';
import { Circle, CircleSchema } from '../circles/entities/circle.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Circle.name, schema: CircleSchema }]),
    CirclesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, CirclesService],
  exports: [UsersService],
})
export class UsersModule {}
