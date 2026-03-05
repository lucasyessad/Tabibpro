import { Controller, Get, UseGuards } from '@nestjs/common';
import { FacturationService } from './facturation.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

// TODO: Facturation DZD — Tiers payant CNAS/CASNOS
@Controller('facturation')
@UseGuards(JwtAuthGuard)
export class FacturationController {
  constructor(private readonly service: FacturationService) {}
}
