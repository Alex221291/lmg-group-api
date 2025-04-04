import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateSectionDto } from '../dto/section/create-section.dto';
import { GetSectionDto } from 'src/dto/section/get-section.dto';
import { GetSectionMapDto } from 'src/dto/section/get-section-map.dto';
import { GetPortfolioDto } from 'src/dto/portfolio/get-portfolio.dto';
import { $Enums } from '@prisma/client';
import { TransliterateService } from 'src/engine/transliterate.service';

@Injectable()
export class SectionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSectionDto) {
    return await this.prisma.section.create({ data });
  }

  async findAll():Promise<GetSectionDto[] | []> {
    return await this.prisma.section.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.section.findUnique({ where: { id } });
  }

  async update(id: string, data: CreateSectionDto) {
    return await this.prisma.section.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.section.delete({ where: { id } });
  }

  async getMap(sectionId?: string): Promise<GetSectionMapDto | null> {
      const section = await this.prisma.section.findUnique({
          where: { id: sectionId },
          include: {
              ategory: {
                where: { status: $Enums.ContentSatus.PUBLISHED },
                  include: {
                      categoryArea: {
                        where: { status: $Enums.ContentSatus.PUBLISHED },
                          include: {
                            area: {},
                              build: {
                                where: { status: $Enums.ContentSatus.PUBLISHED },
                                //   select: {
                                //       id: true,
                                //       name: true,
                                //       coordinates: true,
                                //       list: true,
                                //       categoryAreaId: true
                                //   }
                              }
                          }
                      }
                  }
              }
          }
      });
  
      if (!section) {
          return null;
      }
  
      const result: GetSectionMapDto = {
          id: section.id,
          number: section.number,
          title: section.title,
          description: section.description,
          status: section.status,
          createdAt: section.createdAt,
          updatedAt: section.updatedAt,
          build: [],
          list: []
      };
  
      // Объединение всех build из categoryArea
      section.ategory.forEach(cat => {
          cat.categoryArea.forEach(area => {
              area.build.forEach(buildItem => {
                  // Распарсить coordinates
                  const parsedCoordinates = JSON.parse(buildItem.coordinates as string) as [number, number][];
                  buildItem.coordinates = parsedCoordinates;
  
                  // Распарсить list
                  const parsedList = JSON.parse(buildItem.list as string) as { title: string; value: string }[];
                  buildItem.list = parsedList;
                  
                  const parsedBuildAreaCoordinates = JSON.parse(buildItem.buildAreaCoordinates as string) as [number, number][];
                  buildItem.buildAreaCoordinates = parsedBuildAreaCoordinates;

                  result.build.push({
                    id: buildItem.id,
                    categoryId: cat.id,
                    categoryAreaId: buildItem?.categoryAreaId,
                    number: buildItem.number,
                    coordinates: parsedCoordinates,
                    buildAreaCoordinates: parsedBuildAreaCoordinates,
                    iconPictureId: cat.iconPictureId,
                    name: buildItem?.name,
                    wDescription: buildItem.wDescription,
                    pictureId: buildItem.pictureId,
                    gTitle: buildItem.gTitle,
                    gSubTitle: buildItem.gSubTitle,                    
                    list: parsedList,                    
                    createdAt: buildItem.createdAt,
                    updatedAt: buildItem.updatedAt,
                    status: buildItem. status,
                    urlBuild: new TransliterateService().transliterateText(buildItem.name),
                    urlCategory: new TransliterateService().transliterateText(cat.title),
                    urlCategoryArea: new TransliterateService().transliterateText(area.area.name),
                  });
              });
          });
      });
  
      // Объединение и суммирование значений list из всех build
      const combinedList = result.build.reduce((acc, buildItem) => {
          if (buildItem.list) {
              buildItem.list.forEach(curr => {
                if (curr.title) {
                    let title = curr.title === 'Вид носителя' ? 'Количество рекламных площадок' : curr.title;
                    if (!acc[title]) {
                        acc[title] = { title: title, value: 0 };
                    }
                    acc[title].value += parseFloat(curr.value) || 1;
                }
              });
          }
          return acc;
      }, {});
  
      // Преобразование combinedList в массив
      result.list = Object.values(combinedList);
  
      return result;
  }

  async getAllMaps(): Promise<GetSectionMapDto[]> {
    const sections = await this.prisma.section.findMany({
        where: { status: $Enums.ContentSatus.PUBLISHED },
        include: {
            ategory: {
                where: { status: $Enums.ContentSatus.PUBLISHED },
                include: {
                    categoryArea: {
                        where: { status: $Enums.ContentSatus.PUBLISHED },
                        include: {
                            area:{},
                            build: {
                                where: { status: $Enums.ContentSatus.PUBLISHED },
                                // select: {
                                //     id: true,
                                //     name: true,
                                //     coordinates: true,
                                //     list: true,
                                //     categoryAreaId: true
                                // }
                            }
                        }
                    }
                }
            }
        }
    });

    const result: GetSectionMapDto[] = sections.map(section => {
        const sectionDto: GetSectionMapDto = {
            id: section.id,
            number: section.number,
            title: section.title,
            description: section.description,
            status: section.status,
            createdAt: section.createdAt,
            updatedAt: section.updatedAt,
            build: [],
            list: []
        };

        // Объединение всех build из categoryArea
        section.ategory.forEach(cat => {
            cat.categoryArea.forEach(area => {
                area.build.forEach(buildItem => {
                    // Распарсить coordinates
                    const parsedCoordinates = JSON.parse(buildItem.coordinates as string) as [number, number][];
                    buildItem.coordinates = parsedCoordinates;

                    // Распарсить list
                    const parsedList = JSON.parse(buildItem.list as string) as { title: string; value: string }[];
                    buildItem.list = parsedList;

                    const parsedBuildAreaCoordinates = JSON.parse(buildItem.buildAreaCoordinates as string) as [number, number][];
                    buildItem.buildAreaCoordinates = parsedBuildAreaCoordinates;


                    sectionDto.build.push({
                        id: buildItem.id,
                        categoryId: cat.id,
                        categoryAreaId: buildItem?.categoryAreaId,
                        number: buildItem.number,
                        coordinates: parsedCoordinates,
                        buildAreaCoordinates: parsedBuildAreaCoordinates,
                        iconPictureId: cat.iconPictureId,
                        name: buildItem?.name,
                        wDescription: buildItem.wDescription,
                        pictureId: buildItem.pictureId,
                        gTitle: buildItem.gTitle,
                        gSubTitle: buildItem.gSubTitle,                    
                        list: parsedList,                    
                        createdAt: buildItem.createdAt,
                        updatedAt: buildItem.updatedAt,
                        status: buildItem. status,
                        urlBuild: new TransliterateService().transliterateText(buildItem.name),
                        urlCategory: new TransliterateService().transliterateText(cat.title),
                        urlCategoryArea: new TransliterateService().transliterateText(area.area.name),
                    });
                });
            });
        });

        // Объединение и суммирование значений list из всех build
        const combinedList = sectionDto.build.reduce((acc, buildItem) => {
            if (buildItem.list) {
                buildItem.list.forEach(curr => {
                    if (curr.title) {
                        let title = curr.title === 'Вид носителя' ? 'Количество рекламных площадок' : curr.title;
                        if (!acc[title]) {
                            acc[title] = { title: title, value: 0 };
                        }
                        acc[title].value += parseFloat(curr.value) || 1;
                    }
                });
            }
            return acc;
        }, {});

        // Преобразование combinedList в массив
        sectionDto.list = Object.values(combinedList);

        return sectionDto;
    });

    return result;
  }
  async getPortfolios(sectionNumber: number): Promise<any> { //GetPortfolioDto[]
    const result = await this.prisma.section.findMany({
        where:{
            number: sectionNumber,
            status: $Enums.ContentSatus.PUBLISHED,
        },
        include: {
            ategory: {
                orderBy:{
                    number: 'asc'
                },
                include:{
                    portfolio: true,
                }
            }
        }
    });

    const portfolios: GetPortfolioDto[] = result.flatMap(section =>
        section.ategory.flatMap(category =>
            category.portfolio.map(portfolio => ({
                id: portfolio.id,
                number: portfolio.number,
                title: portfolio.title,
                description: portfolio.description,
                categoryId: portfolio.categoryId,
                status: portfolio.status,
                pictureId: portfolio.pictureId
            }))
        )
    );

    return portfolios;
    }

  async getAll(): Promise<GetPortfolioDto[]> {
    const answer =  await this.prisma.portfolio.findMany({orderBy: {
      number: 'asc'
    }});

    return answer?.map(item => {
      return {
        id: item?.id,
        number: item?.number,
        title: item?.title,
        description: item?.description,
        status: item?.status,
        categoryId: item?.categoryId,
        pictureId: item?.pictureId,
      };
    })
  }
}
