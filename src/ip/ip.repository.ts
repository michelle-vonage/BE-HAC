import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ip, IpDocument } from './schemas/ip.schema';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

const IP_REGEX =
  /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$|^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(([0-9a-fA-F]{1,4}:)*:([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4}))$/;

function sanitizeAddress(address: string): string {
  if (!IP_REGEX.test(address)) {
    throw new Error(`Invalid IP address: ${address}`);
  }
  return address;
}

@Injectable()
export class IpRepository {
  constructor(
    @InjectModel(Ip.name) private readonly ipModel: Model<IpDocument>,
  ) {}

  async findAll(): Promise<IpDocument[]> {
    return this.ipModel.find().exec();
  }

  async findOne(address: string): Promise<IpDocument | null> {
    return this.ipModel.findOne({ address: sanitizeAddress(address) }).exec();
  }

  async create(dto: CreateIpDto): Promise<IpDocument> {
    const created = new this.ipModel(dto);
    return created.save();
  }

  async update(address: string, dto: UpdateIpDto): Promise<IpDocument | null> {
    return this.ipModel
      .findOneAndUpdate({ address: sanitizeAddress(address) }, dto, {
        new: true,
      })
      .exec();
  }

  async remove(address: string): Promise<IpDocument | null> {
    return this.ipModel
      .findOneAndDelete({ address: sanitizeAddress(address) })
      .exec();
  }
}
