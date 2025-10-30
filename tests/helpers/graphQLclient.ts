import request from 'supertest';
import { Express } from 'express';
import jwt from 'jsonwebtoken';

export class GraphQLTestClient {
    constructor(private app: Express) { }

    private createToken(userId: string, role: string): string {
        return jwt.sign(
            { userId, role },
            process.env.JWT_SECRET || 'test-secret',
            { expiresIn: '1h' }
        );
    }

    async query<T = any>(
        query: string,
        variables?: Record<string, any>,
        options?: {
            token?: string;
            userId?: string;
            role?: string;
        }
    ): Promise<{
        data?: T;
        errors?: Array<{ message: string; extensions?: any }>;
    }> {
        const req = request(this.app)
            .post('/graphql')
            .send({ query, variables });

        if (options?.token) {
            req.set('Authorization', `Bearer ${options.token}`);
        } else if (options?.userId && options?.role) {
            const token = this.createToken(options.userId, options.role);
            req.set('Authorization', `Bearer ${token}`);
        }

        const response = await req.expect(200);
        return response.body;
    }

    async mutate<T = any>(
        mutation: string,
        variables?: Record<string, any>,
        options?: {
            token?: string;
            userId?: string;
            role?: string;
        }
    ): Promise<{
        data?: T;
        errors?: Array<{ message: string; extensions?: any }>;
    }> {
        return this.query<T>(mutation, variables, options);
    }

    async queryAsUser<T = any>(
        query: string,
        userId: string,
        role: string = 'USER',
        variables?: Record<string, any>
    ): Promise<{
        data?: T;
        errors?: Array<{ message: string; extensions?: any }>;
    }> {
        return this.query<T>(query, variables, { userId, role });
    }
}