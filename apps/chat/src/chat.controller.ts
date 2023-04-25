import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageBody } from '@nestjs/websockets';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  newMessage(@MessageBody() body: any) {
    console.log(body);
    // return this.chatService.getHello();
  }
}
