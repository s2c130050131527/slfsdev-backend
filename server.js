/* eslint-disable import/first */
/* eslint-disable no-console */
import dotenv from 'dotenv';

dotenv.config();
import chalk from 'chalk';

import mongoose from '~/core/mongoose';

import { PORT, HOST } from './src/env';
import app from './src/app';

const teal500 = chalk.hex('#009688');

app.listen(Number(PORT), HOST, () => {
  console.log(teal500('🚀  App: Bootstrap Succeeded'));
  console.log(teal500(`🚀  Host: http://${HOST}:${PORT}`));

  mongoose.connection
    .on('open', () => console.log(teal500('🚀  MongoDB: Connection Succeeded')))
    .on('error', err => console.error(err));
});
