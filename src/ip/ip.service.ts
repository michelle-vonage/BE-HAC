import { Injectable } from '@nestjs/common';
import { IpRepository } from './ip.repository';
import { IpDocument } from './schemas/ip.schema';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

@Injectable()
export class IpService {
  constructor(private readonly ipRepository: IpRepository) {}

  findAll(): Promise<IpDocument[]> {
    return this.ipRepository.findAll();
  }

  findOne(address: string): Promise<IpDocument | null> {
    return this.ipRepository.findOne(address);
  }

  create(dto: CreateIpDto): Promise<IpDocument> {
    return this.ipRepository.create(dto);
  }

  update(address: string, dto: UpdateIpDto): Promise<IpDocument | null> {
    return this.ipRepository.update(address, dto);
  }

  remove(address: string): Promise<IpDocument | null> {
    return this.ipRepository.remove(address);
  }
}
