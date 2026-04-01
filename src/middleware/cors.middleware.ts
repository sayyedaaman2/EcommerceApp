import cors, { CorsOptions } from 'cors';

type Env = 'development' | 'test' | 'production';

const corsConfigs: Record<Env, CorsOptions> = {
    development: {
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },

    test: {
        origin: '*',
        credentials: false,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },

    production: {
        origin: process.env.FRONTEND_URL || false,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
};

const env = (process.env.NODE_ENV as Env) || 'development';

const corsOptions = corsConfigs[env];

const corsMiddleware = cors(corsOptions);
export default corsMiddleware;
