import { Controller, Get, UseGuards } from '@nestjs/common';
import { MessagerieService } from './messagerie.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// TODO: Messagerie sécurisée patient-médecin
@Controller('messagerie')
@UseGuards(JwtAuthGuard)
export class MessagerieController {
  constructor(private readonly service: MessagerieService) {}
}
