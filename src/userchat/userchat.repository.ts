import { EntityRepository, Repository } from 'typeorm';
import { ChatData } from './userchat.entity'; // Ensure correct path

@EntityRepository(ChatData)
export class ChatDataRepository extends Repository<ChatData> {}