import { Module } from '@nestjs/common';
import { CirclesService } from './circles.service';
import { CirclesController } from './circles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Circle, CircleSchema } from './entities/circle.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Circle.name, schema: CircleSchema }]),
  ],
  controllers: [CirclesController],
  providers: [CirclesService],
  exports: [CirclesService],
})
export class CirclesModule {}
