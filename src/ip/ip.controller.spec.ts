import { Test, TestingModule } from '@nestjs/testing';
import { IpController } from './ip.controller';
import { IpService } from './ip.service';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

const mockIpService = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockResolvedValue({ address: '192.168.1.1' }),
  update: jest.fn().mockResolvedValue({ address: '192.168.1.1' }),
  remove: jest.fn().mockResolvedValue({ address: '192.168.1.1' }),
};

describe('IpController', () => {
  let controller: IpController;

  beforeEach(async () => {
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

  it('findOne should return null when not found', async () => {
    const result = await controller.findOne('192.168.0.1');
    expect(result).toBeNull();
    expect(mockIpService.findOne).toHaveBeenCalledWith('192.168.0.1');
  });

  it('create should return the created IP', async () => {
    const dto = Object.assign(new CreateIpDto(), { address: '192.168.1.1' });
    const result = await controller.create(dto);
    expect(result).toEqual({ address: '192.168.1.1' });
    expect(mockIpService.create).toHaveBeenCalledWith(dto);
  });

  it('update should return the updated IP', async () => {
    const dto = Object.assign(new UpdateIpDto(), { description: 'updated' });
    const result = await controller.update('192.168.1.1', dto);
    expect(result).toEqual({ address: '192.168.1.1' });
    expect(mockIpService.update).toHaveBeenCalledWith('192.168.1.1', dto);
  });

  it('remove should return the removed IP', async () => {
    const result = await controller.remove('192.168.1.1');
    expect(result).toEqual({ address: '192.168.1.1' });
    expect(mockIpService.remove).toHaveBeenCalledWith('192.168.1.1');
  });
});
