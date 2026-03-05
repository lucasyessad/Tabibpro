import { Injectable } from '@nestjs/common';
import { PrismaMedicalService } from '../database/prisma-medical.service';

// TODO: Statistiques cabinet — rapport activité
@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaMedicalService) {}
}
