import { Module } from '@nestjs/common';
import { MessagerieController } from './messagerie.controller';
import { MessagerieService } from './messagerie.service';

// TODO: Messagerie sécurisée patient-médecin
@Module({
  controllers: [MessagerieController],
  providers: [MessagerieService],
  exports: [MessagerieService],
})
export class MessagerieModule {}
