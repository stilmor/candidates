import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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

  //   @Get('candidates/:candidateId/interviews')
  //   @ApiOperation({ summary: 'List interviews for a candidate' })
  //   @ApiOkResponse({
  //     description: 'List of interviews',
  //     type: InterviewResponseDto,
  //     isArray: true,
  //   })
  //   async listByCandidate(
  //     @Param('candidateId') candidateId: string,
  //   ): Promise<InterviewResponseDto[]> {
  //     const items = await this.getCandidateInterviews.execute(candidateId);
  //     return items.map((i) => new InterviewResponseDto(i));
  //   }

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
}
