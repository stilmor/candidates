import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateInterviewDto } from '../../application/dtos/create-interview-dto';
import { InterviewResponseDto } from './dtos/interview-response.dto';
import { CreateInterviewUseCase } from '../../application/usecases/create-interview.usecase';
import { GetInterviewUseCase } from '../../application/usecases/get-interview.usecase';
// import { GetCandidateInterviewsUseCase } from '../../application/usecases/get-candidate-interviews.usecase';

@ApiTags('interviews')
@Controller()
export class InterviewController {
  constructor(
    private readonly createInterview: CreateInterviewUseCase,
    private readonly getInterview: GetInterviewUseCase,
  ) {}

  @Post('interviews')
  @ApiOperation({ summary: 'Assign an interview to a candidate' })
  @ApiCreatedResponse({
    description: 'Interview created',
    type: InterviewResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async create(@Body() dto: CreateInterviewDto): Promise<InterviewResponseDto> {
    const created = await this.createInterview.execute(dto);
    return new InterviewResponseDto(created);
  }

  @Get()
  @ApiOperation({ summary: 'Get all interviews' })
  @ApiOkResponse({
    description: 'Interviews retrieved successfully',
    type: InterviewResponseDto,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Interview not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiOkResponse({
    description: 'Interviews retrieved successfully',
    type: InterviewResponseDto,
    isArray: true,
  })
  async findAll(): Promise<InterviewResponseDto[]> {
    const interviews = await this.getInterview.getAll();
    return interviews.map((interview) => new InterviewResponseDto(interview));
  }

  @Get('interviews/:id')
  @ApiOperation({ summary: 'Get interview by ID' })
  @ApiOkResponse({
    description: 'Interview found',
    type: InterviewResponseDto,
  })
  async getById(@Param('id') id: string): Promise<InterviewResponseDto | null> {
    const interview = await this.getInterview.execute(id);
    return interview ? new InterviewResponseDto(interview) : null;
  }

  @Get('interviews/candidate/:candidateId')
  @ApiOperation({ summary: 'Get interviews by candidate ID' })
  @ApiOkResponse({
    description: 'Interviews found',
    type: InterviewResponseDto,
    isArray: true,
  })
  async getByCandidate(
    @Param('candidateId') candidateId: string,
  ): Promise<InterviewResponseDto[]> {
    const interviews = await this.getInterview.getByCandidate(candidateId);
    return interviews.map((interview) => new InterviewResponseDto(interview));
  }
}
