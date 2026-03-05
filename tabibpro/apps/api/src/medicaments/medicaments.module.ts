import { Module } from '@nestjs/common';
import { MedicamentsController } from './medicaments.controller';
import { MedicamentsService } from './medicaments.service';

// TODO: Pharmacopée ANPP — Recherche médicaments DZ
@Module({
  controllers: [MedicamentsController],
  providers: [MedicamentsService],
  exports: [MedicamentsService],
})
export class MedicamentsModule {}
