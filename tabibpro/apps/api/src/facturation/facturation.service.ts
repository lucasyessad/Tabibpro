import { Injectable } from '@nestjs/common';
import { PrismaMedicalService } from '../database/prisma-medical.service';

// TODO: Facturation DZD — Tiers payant CNAS/CASNOS
@Injectable()
export class FacturationService {
  constructor(private readonly prisma: PrismaMedicalService) {}
}
