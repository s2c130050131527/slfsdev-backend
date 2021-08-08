/* eslint-disable no-restricted-syntax */
import { parse } from 'dotenv';
import path from 'path';

const envConfig = parse(path.resolve(__dirname, '../.env'), { debug: true });
// eslint-disable-next-line guard-for-in
for (const k in envConfig) {
  if (k === 'MONGODB_URI') {
    console.log(process.env[k], envConfig[k]);
  }

  process.env[k] = envConfig[k];
}

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const INDEX_NAME = process.env.INDEX_NAME || 'local';

export const HOST = process.env.HOST || '0.0.0.0';
export const PORT = process.env.PORT || 9000;

export const SECRET_KEY = process.env.SECRET_KEY || 'jbmpHPLoaV8N0nEpuLxlpT95FYakMPiu';

export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';

// ---

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'XXX';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'XXX';

export const RATE_LIMIT = process.env.RATE_LIMIT || 0;

export const SENTRY_DSN = process.env.SENTRY_DSN || null;
