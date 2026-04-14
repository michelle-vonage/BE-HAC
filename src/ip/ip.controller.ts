import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IpService } from './ip.service';
import { IpDocument } from './schemas/ip.schema';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Get()
  findAll(): Promise<IpDocument[]> {
    return this.ipService.findAll();
  }

  @Get(':address')
  async findOne(@Param('address') address: string): Promise<IpDocument> {
    const ip = await this.ipService.findOne(address);
    if (!ip) {
      throw new NotFoundException(`IP address '${address}' not found`);
    }
    return ip;
  }

  @Post()
  create(@Body() createIpDto: CreateIpDto): Promise<IpDocument> {
    return this.ipService.create(createIpDto);
  }

  @Put(':address')
  async update(
    @Param('address') address: string,
    @Body() updateIpDto: UpdateIpDto,
  ): Promise<IpDocument> {
    const ip = await this.ipService.update(address, updateIpDto);
    if (!ip) {
      throw new NotFoundException(`IP address '${address}' not found`);
    }
    return ip;
  }

  @Delete(':address')
  async remove(@Param('address') address: string): Promise<IpDocument> {
    const ip = await this.ipService.remove(address);
    if (!ip) {
      throw new NotFoundException(`IP address '${address}' not found`);
    }
    return ip;
  }
}
