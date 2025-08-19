import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../../../src/app.module';
import { makeCreateCandidatePayload } from '../factory/candidate.factory';

import type { Server } from 'http';

interface TestCandidateDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  observations?: string | null;
  status?: string;
}

/**
 * E2E: POST /candidates
 */

describe('POST /candidates (e2e)', () => {
  let app: INestApplication;
  let server: Server;
  let createdId: string | null = null;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Reproduce los pipes globales de main.ts necesarios para validación
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
    server = app.getHttpServer() as unknown as Server;
  });

  afterAll(async () => {
    // Limpieza si existe DELETE /candidates/:id (ignora error si no existe)
    if (createdId) {
      try {
        await request(server).delete(`/candidates/${createdId}`);
      } catch {
        /* empty */
      }
    }
    await app.close();
  });

  it('debería crear un candidato y devolver 201', async () => {
    const payload = makeCreateCandidatePayload({
      email: `e2e_${Date.now()}@test.com`,
      firstName: 'Jane',
      lastName: 'Doe',
    });

    const res = await request(server)
      .post('/candidates')
      .send(payload)
      .expect(201);

    const body = res.body as unknown as TestCandidateDTO;
    createdId = body?.id ?? null;

    expect(typeof body.id).toBe('string');
    expect(body).toMatchObject({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
    });
  });
});
