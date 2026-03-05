import { Injectable } from '@nestjs/common';
import { PrismaMedicalService } from '../database/prisma-medical.service';

// TODO: Messagerie sécurisée patient-médecin
@Injectable()
export class MessagerieService {
  constructor(private readonly prisma: PrismaMedicalService) {}
}
