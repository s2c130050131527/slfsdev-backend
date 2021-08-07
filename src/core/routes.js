import { Router } from 'express';

import { INDEX_NAME } from '~/env';
import crudOperations from '~/crud-operations';
import authentication from '~/authentication';

const router = Router();

router.get('/', (req, res) => {
  res.send(`app-root, ${INDEX_NAME} mode`);
});

router.get('/me', (req, res) => {
  const { user } = req;
  res.status(200).json({ data: user });
});

router.use(crudOperations.prefix, crudOperations);
router.use(authentication.prefix, authentication);

export default router;
