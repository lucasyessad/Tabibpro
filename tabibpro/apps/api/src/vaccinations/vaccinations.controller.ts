import { Controller, Get, UseGuards } from '@nestjs/common';
import { VaccinationsService } from './vaccinations.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// TODO: Vaccinations — Calendrier PEV algérien
@Controller('vaccinations')
@UseGuards(JwtAuthGuard)
export class VaccinationsController {
  constructor(private readonly service: VaccinationsService) {}
}
