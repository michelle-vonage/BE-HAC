import { Test, TestingModule } from '@nestjs/testing';
import { IpService } from './ip.service';
import { IpRepository } from './ip.repository';
import { CreateIpDto } from './dto/create-ip.dto';
import { UpdateIpDto } from './dto/update-ip.dto';

const mockIpRepository = {
  findAll: jest.fn().mockResolvedValue([]),
  findOne: jest.fn().mockResolvedValue(null),
  create: jest.fn().mockResolvedValue({ address: '192.168.1.1' }),
  update: jest.fn().mockResolvedValue({ address: '192.168.1.1' }),
  remove: jest.fn().mockResolvedValue({ address: '192.168.1.1' }),
};

describe('IpService', () => {
  let service: IpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IpService,
        { provide: IpRepository, useValue: mockIpRepository },
      ],
    }).compile();

    service = module.get<IpService>(IpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should delegate to repository', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
    expect(mockIpRepository.findAll).toHaveBeenCalled();
  });

  it('findOne should delegate to repository', async () => {
    const result = await service.findOne('192.168.0.1');
    expect(result).toBeNull();
    expect(mockIpRepository.findOne).toHaveBeenCalledWith('192.168.0.1');
  });

  it('create should delegate to repository', async () => {
    const dto = Object.assign(new CreateIpDto(), { address: '192.168.1.1' });
    const result = await service.create(dto);
    expect(result).toEqual({ address: '192.168.1.1' });
    expect(mockIpRepository.create).toHaveBeenCalledWith(dto);
  });

  it('update should delegate to repository', async () => {
    const dto = Object.assign(new UpdateIpDto(), { description: 'updated' });
    const result = await service.update('192.168.1.1', dto);
    expect(result).toEqual({ address: '192.168.1.1' });
    expect(mockIpRepository.update).toHaveBeenCalledWith('192.168.1.1', dto);
  });

  it('remove should delegate to repository', async () => {
    const result = await service.remove('192.168.1.1');
    expect(result).toEqual({ address: '192.168.1.1' });
    expect(mockIpRepository.remove).toHaveBeenCalledWith('192.168.1.1');
  });
});
