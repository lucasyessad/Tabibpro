import { Injectable } from '@nestjs/common';
import { PrismaMedicalService } from '../database/prisma-medical.service';

// TODO: Pharmacopée ANPP — Recherche médicaments DZ
@Injectable()
export class MedicamentsService {
  constructor(private readonly prisma: PrismaMedicalService) {}
}
