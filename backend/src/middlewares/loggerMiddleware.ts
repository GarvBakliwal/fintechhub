import morgan, { StreamOptions } from 'morgan';
import logger from '../lib/logger';

const stream: StreamOptions = {
    write: (message) => logger.http(message.trim()),
};

const skip = (req: any) => {
    const url = req.originalUrl || req.url;

    if (url === '/health') return true;

    const skipExtensions = ['.ico', '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2'];
    if (skipExtensions.some(ext => url.endsWith(ext))) return true;

    return false;
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
);

export default morganMiddleware;
