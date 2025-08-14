import { PrismaClient } from "@prisma/client";

class PrismaManager {
    private static instance: PrismaManager;
    private client: PrismaClient;
    private isConnected = false
    private connectionRetries = 0
    private readonly maxRetries = 3

    private constructor() {
        this.client = new PrismaClient(
            {
                log: ['query', 'info', 'warn', 'error'],
                errorFormat: "pretty",
            }
        );
    }

    static getInstance(): PrismaManager {
        if (!PrismaManager.instance) {
            PrismaManager.instance = new PrismaManager();
        }
        return PrismaManager.instance;
    }

    private async testConnection(): Promise<void> {
        try {
            // Simple connectivity test
            await this.client.$connect()
            console.log('Prisma client connected')
        } catch (error) {
            console.error('Prisma connection test failed:', error)
            throw new Error(`Database connection failed: ${error}`)
        }
    }

    async shutdown(): Promise<void> {
        console.log('Starting graceful shutdown...')

        this.isConnected = false

        try {
            await this.client.$disconnect()
            console.log('Prisma client disconnected')
        } catch (error) {
            console.error('Error during Prisma disconnect:', error)
        }

        console.log('Graceful shutdown completed')
    }

    private setupGracefulShutdown(): void {
        const gracefulShutdown = async (signal: string) => {
            console.log(`\Received ${signal}. Initiating graceful shutdown...`)
            await this.shutdown()
            process.exit(0)
        }

        // Handle different termination signals
        process.on('SIGINT', () => gracefulShutdown('SIGINT'))
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
        process.on('SIGQUIT', () => gracefulShutdown('SIGQUIT'))

        // Handle uncaught exceptions
        process.on('uncaughtException', async (error) => {
            console.error('Uncaught Exception:', error)
            await this.shutdown()
            process.exit(1)
        })

        process.on('unhandledRejection', async (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason)
            await this.shutdown()
            process.exit(1)
        })
    }


    private async forceShutdown(): Promise<void> {
        console.log('Forcing immediate shutdown...')
        await this.shutdown()
        process.exit(1)
    }


    isDbConnected(): boolean {
        return this.isConnected
    }

    async reconnect(): Promise<boolean> {
        console.log('Attempting to reconnect...')
        try {
            await this.client.$disconnect()
            await this.initilize()
            return true
        } catch (error) {
            console.error('Reconnection failed:', error)
            return false
        }
    }

    async initilize(): Promise<PrismaClient> {
        try {
            await this.testConnection();

            this.isConnected = true;
            this.connectionRetries = 0;

            console.log("Connected to Database Successfully");
            return this.client;
        }
        catch (error) {
            console.log("Prisma connection failed");
            this.connectionRetries++;

            if (this.connectionRetries >= this.maxRetries) {
                console.error(`Max retries (${this.maxRetries}) reached. Shutting down application...`)
                await this.forceShutdown()
            }

            throw error;
        }
    }
}

export default PrismaManager;