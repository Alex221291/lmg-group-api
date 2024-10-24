import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Tariff } from '@prisma/client';
import { GetTariffDto } from 'src/dto/tariff/get-tariff.dto';
import { CreateTariffDto } from 'src/dto/tariff/create-tariff.dto';
import { UpdateTariffDto } from 'src/dto/tariff/update-tariff.dto';
@Injectable()
export class TariffService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string): Promise<GetTariffDto | null> {
    const result = await this.prisma.tariff.findUnique({
      where: {id},
    });
    return {
      id: result?.id,
      timeInterval: result?.timeInterval,
      options: result?.options?.split('@#$'),
      savings: result?.savings,
      price: result?.price,
    };
  }

  async getAll(): Promise<GetTariffDto[]> {
    const tariffs = await this.prisma.tariff.findMany({orderBy: {
      savings: 'asc'
    }});
    return tariffs?.map(tariff => {
      return {
        id: tariff?.id,
        timeInterval: tariff?.timeInterval,
        options: tariff?.options?.split('@#$'),
        savings: tariff?.savings,
        price: tariff?.price,
      };
    });
  }

  async createTariff(tariff: CreateTariffDto): Promise<Tariff> {
    return await this.prisma.tariff.create({
      data: {
        timeInterval: tariff?.timeInterval,
        options: tariff?.options?.join('@#$'),
        savings: tariff?.savings,
        price: tariff?.price,
      },
    });
  }

  async updateTariff(tariff: UpdateTariffDto): Promise<Tariff> {
    return await this.prisma.tariff.update({
      data: {
        timeInterval: tariff?.timeInterval,
        options: tariff?.options?.join('@#$'),
        savings: tariff?.savings,
        price: tariff?.price,
      },
      where: {id: tariff.id},
    });
  }

  async deleteTariff(id: string): Promise<Tariff> {
    return await this.prisma.tariff.delete({
      where: {id},
    });
  }
}