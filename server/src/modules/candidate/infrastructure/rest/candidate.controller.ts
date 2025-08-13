import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  NotFoundException,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateCandidateUseCase } from '../../application/usecases/create-candidate.usecase';
import { CreateCandidateDto } from '../../application/dtos/create-candidate-dto';
import { GetCandidatesUseCase } from '../../application/usecases/get-candidate.usecase';
import { CandidateResponseDto } from './dtos/candidate-response.dto';
import { UpdateCandidateUseCase } from '../../application/usecases/update-candidate.usecase';
import { UpdateCandidateDto } from '../../application/dtos/update-candidate-dto';
import { DeleteCandidateUseCase } from '../../application/usecases/delete-candidate.usecase';
@ApiTags('candidates')
@Controller('candidates')
export class CandidateController {
  constructor(
    private readonly createCandidateUseCase: CreateCandidateUseCase,
    private readonly getCandidatesUseCase: GetCandidatesUseCase,
    private readonly UpdateCandidateUseCase: UpdateCandidateUseCase,
    private readonly deleteCandidateUseCase: DeleteCandidateUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new candidate' })
  @ApiCreatedResponse({
    description: 'Candidate created successfully',
    type: CandidateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async execute(
    @Body() dto: CreateCandidateDto,
  ): Promise<CandidateResponseDto> {
    const created = await this.createCandidateUseCase.execute(dto);
    return new CandidateResponseDto(created);
  }

  @Get()
  @ApiOperation({ summary: 'Get all candidates' })
  @ApiOkResponse({
    description: 'Candidates retrieved successfully',
    type: CandidateResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiOkResponse({
    description: 'Candidates retrieved successfully',
    type: CandidateResponseDto,
    isArray: true,
  })
  async findAll(
    @Query('name') name?: string,
    @Query('email') email?: string,
  ): Promise<CandidateResponseDto[]> {
    const candidates = await this.getCandidatesUseCase.execute({ name, email });
    return candidates.map((candidate) => new CandidateResponseDto(candidate));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a candidate by ID' })
  @ApiOkResponse({
    description: 'Candidate retrieved successfully',
    type: CandidateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async findById(@Param('id') id: string): Promise<CandidateResponseDto> {
    const candidate = await this.getCandidatesUseCase.executeById(id);
    if (!candidate) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    return new CandidateResponseDto(candidate);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a candidate by ID' })
  @ApiOkResponse({
    description: 'Candidate updated successfully',
    type: CandidateResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCandidateDto,
  ): Promise<CandidateResponseDto> {
    const updated = await this.UpdateCandidateUseCase.execute(id, dto);
    if (!updated) {
      throw new NotFoundException(`Candidate with id ${id} not found`);
    }
    return new CandidateResponseDto(updated);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a candidate by ID' })
  @ApiOkResponse({
    description: 'Candidate deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Candidate not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteCandidateUseCase.execute(id);
  }
}
