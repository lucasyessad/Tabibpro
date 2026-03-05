import { Injectable } from '@nestjs/common';
import { PrismaMedicalService } from '../database/prisma-medical.service';

// TODO: Stock cabinet — Alertes rupture/péremption
@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaMedicalService) {}
}
