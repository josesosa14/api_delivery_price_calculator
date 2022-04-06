import { BadRequestException, Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';

@Injectable()
export class DistancePriceMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const distancePrices = req.body.distancePrices;
     // Check if the values in the next position are greater
     // 0 if its put method and distancePrices is not required
     const countDistancePrices = (distancePrices) ? distancePrices.length : 0;
     for (let i = 0; countDistancePrices > i; i++) {
       if (
         distancePrices[i + 1] &&
         (distancePrices[i].to > distancePrices[i + 1].from ||
           !distancePrices[i].to)
       ) {
         throw new BadRequestException(
           "'to' need to be greater than the next 'from'. Check distancePrices array",
         );
        }
     }
    next();
  }
}
