import { Controller, Get, UseGuards } from '@nestjs/common';
import { MedicamentsService } from './medicaments.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// TODO: Pharmacopée ANPP — Recherche médicaments DZ
@Controller('medicaments')
@UseGuards(JwtAuthGuard)
export class MedicamentsController {
  constructor(private readonly service: MedicamentsService) {}
}
