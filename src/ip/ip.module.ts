import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ip, IpSchema } from './schemas/ip.schema';
import { IpRepository } from './ip.repository';
import { IpService } from './ip.service';
import { IpController } from './ip.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Ip.name, schema: IpSchema }])],
  controllers: [IpController],
  providers: [IpService, IpRepository],
  exports: [IpService],
})
export class IpModule {}
