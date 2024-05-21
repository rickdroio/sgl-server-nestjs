import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseArrayPipe } from '@nestjs/common';
import { CidadesService } from './cidades.service';
import { CreateCidadeDto } from './dto/create-cidade.dto';
import { UpdateCidadeDto } from './dto/update-cidade.dto';

@Controller('cidades')
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Post()
  async create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadesService.create(createCidadeDto);
  }

  @Post('batch')
  async updateBatch(@Body(new ParseArrayPipe({ items: CreateCidadeDto })) 
  createCidadeDto: CreateCidadeDto[]) {
    return this.cidadesService.updateBatch(createCidadeDto);
  }  

  @Get()
  findAll(@Query() { take, skip }) {
    return this.cidadesService.findAll(take, skip);
  }

/*   @Get('search')
  searchNome(@Query('query') query: string) {
    //console.log(`called search - query = ${query}`);
    return this.cidadesService.findFiltered(query);
  } */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidadesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidadeDto: UpdateCidadeDto) {
    //return updateCidadeDto;
    return this.cidadesService.update(+id, updateCidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidadesService.remove(+id);
  }
}
