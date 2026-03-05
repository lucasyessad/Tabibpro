import { Injectable } from '@nestjs/common';
import { PrismaMedicalService } from '../database/prisma-medical.service';

// TODO: Vaccinations — Calendrier PEV algérien
@Injectable()
export class VaccinationsService {
  constructor(private readonly prisma: PrismaMedicalService) {}
}
