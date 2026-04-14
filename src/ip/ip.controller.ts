import {
  Body,
  Controller,
  Delete,
  Get,
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
  findOne(@Param('address') address: string): Promise<IpDocument | null> {
    return this.ipService.findOne(address);
  }

  @Post()
  create(@Body() createIpDto: CreateIpDto): Promise<IpDocument> {
    return this.ipService.create(createIpDto);
  }

  @Put(':address')
  update(
    @Param('address') address: string,
    @Body() updateIpDto: UpdateIpDto,
  ): Promise<IpDocument | null> {
    return this.ipService.update(address, updateIpDto);
  }

  @Delete(':address')
  remove(@Param('address') address: string): Promise<IpDocument | null> {
    return this.ipService.remove(address);
  }
}
