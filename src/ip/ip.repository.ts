import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ip, IpDocument } from './schemas/ip.schema';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

@Injectable()
export class IpRepository {
  constructor(
    @InjectModel(Ip.name) private readonly ipModel: Model<IpDocument>,
  ) {}

  async findAll(): Promise<IpDocument[]> {
    return this.ipModel.find().exec();
  }

  async findOne(address: string): Promise<IpDocument | null> {
    const safeAddress = String(address);
    return this.ipModel.findOne({ address: safeAddress }).exec();
  }

  async create(dto: CreateIpDto): Promise<IpDocument> {
    const created = new this.ipModel(dto);
    return created.save();
  }

  async update(address: string, dto: UpdateIpDto): Promise<IpDocument | null> {
    const safeAddress = String(address);
    return this.ipModel
      .findOneAndUpdate({ address: safeAddress }, dto, { new: true })
      .exec();
  }

  async remove(address: string): Promise<IpDocument | null> {
    const safeAddress = String(address);
    return this.ipModel.findOneAndDelete({ address: safeAddress }).exec();
  }
}
