import { Request, Response } from 'express';
import { ScoringService } from './scoring.service';
import { ScoringRepository } from './scoring.repository';

export class ScoringController {
  async processRound(req: Request<{ roundId: string }>, res: Response) {
    const { roundId } = req.params;

    const repository = new ScoringRepository();
    const service = new ScoringService(repository);

    const result = await service.processRound(roundId);

    return res.status(200).json(result);
  }
}
