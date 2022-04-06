import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateDeliveryDto } from 'src/delivery/delivery.dto';

@Injectable()
export class EmailService {
  constructor(
    private mailerService: MailerService,
  ) {}

  async send(
    createDeliveryDto: CreateDeliveryDto,
    totalPrice: number,
    extraWeekend: number,
  ) {
    await this.mailerService.sendMail({
      to: createDeliveryDto.email,
      subject: 'Price of delivery request',
      html: `<p>Date: ${new Date(createDeliveryDto.date).getDate()}/${new Date(createDeliveryDto.date).getMonth()+1}/${new Date(createDeliveryDto.date).getFullYear()} ${new Date(createDeliveryDto.date).getHours()}:${new Date(createDeliveryDto.date).getMinutes()}</p>
           <p>Distance: ${createDeliveryDto.distance}</p>
           <p>Packages: ${createDeliveryDto.countPackages}</p>
           <p>First name: ${createDeliveryDto.firstName}</p>
           <p>Last name: ${createDeliveryDto.lastName}</p>
           <p>Phone: ${createDeliveryDto.phone}</p>
           ${(extraWeekend)? `<p>Subtotal: $${totalPrice}</p><p>Extra weekend: $${extraWeekend}</p>`:''} 
           <p>TOTAL: $${totalPrice + extraWeekend}</p>`,
    });
  }
}
