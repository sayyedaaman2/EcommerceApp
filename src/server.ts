import '@/config/env.config';
import logger from '@/utils/logger';
import prisma from '@/lib/prisma';
import app from './app';

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // try connecting
        await prisma.$connect();

        // optional sanity query
        await prisma.$queryRaw`SELECT 1`;

        logger.info('Database connected');

        app.listen(PORT, () => {
            logger.info('Server started', {
                port: PORT,
                environment: process.env.NODE_ENV,
            });
        });
    } catch (error) {
        logger.error('Database connection failed', {
            error,
        });

        process.exit(1); // crash immediately
    }
}

startServer();
