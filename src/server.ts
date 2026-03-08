import '@/config/env.config';
import logger from '@/utils/logger';
import app from './app';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info('Server started', {
    port: PORT,
    environment: process.env.NODE_ENV,
  });
});
