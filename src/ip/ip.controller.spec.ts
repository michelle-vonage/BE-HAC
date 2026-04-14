import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { IpController } from './ip.controller';
import { IpService } from './ip.service';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

const mockIpService = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn(),
  create: jest.fn().mockResolvedValue({ address: '192.168.1.1' }),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('IpController', () => {
  let controller: IpController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IpController],
      providers: [{ provide: IpService, useValue: mockIpService }],
    }).compile();

    controller = module.get<IpController>(IpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return an array', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([]);
    expect(mockIpService.findAll).toHaveBeenCalled();
  });

  it('findOne should return the IP when found', async () => {
    mockIpService.findOne.mockResolvedValueOnce({ address: '192.168.1.1' });
    const result = await controller.findOne('192.168.1.1');
    expect(result).toEqual({ address: '192.168.1.1' });
  });

  it('findOne should throw NotFoundException when not found', async () => {
    mockIpService.findOne.mockResolvedValueOnce(null);
    await expect(controller.findOne('192.168.0.1')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('create should return the created IP', async () => {
    const dto = Object.assign(new CreateIpDto(), { address: '192.168.1.1' });
    const result = await controller.create(dto);
    expect(result).toEqual({ address: '192.168.1.1' });
    expect(mockIpService.create).toHaveBeenCalledWith(dto);
  });

  it('update should return the updated IP', async () => {
    mockIpService.update.mockResolvedValueOnce({ address: '192.168.1.1' });
    const dto = Object.assign(new UpdateIpDto(), { description: 'updated' });
    const result = await controller.update('192.168.1.1', dto);
    expect(result).toEqual({ address: '192.168.1.1' });
  });

  it('update should throw NotFoundException when not found', async () => {
    mockIpService.update.mockResolvedValueOnce(null);
    const dto = Object.assign(new UpdateIpDto(), { description: 'updated' });
    await expect(controller.update('192.168.0.1', dto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('remove should return the removed IP', async () => {
    mockIpService.remove.mockResolvedValueOnce({ address: '192.168.1.1' });
    const result = await controller.remove('192.168.1.1');
    expect(result).toEqual({ address: '192.168.1.1' });
  });

  it('remove should throw NotFoundException when not found', async () => {
    mockIpService.remove.mockResolvedValueOnce(null);
    await expect(controller.remove('192.168.0.1')).rejects.toThrow(
      NotFoundException,
    );
  });
});
