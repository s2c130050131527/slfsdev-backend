import { Router } from 'express';

import passport from 'passport';
import { INDEX_NAME } from '~/env';
import crudOperations from '~/crud-operations';
import authentication from '~/authentication';
import courseOps from '~/course-ops';

const router = Router();

// eslint-disable-next-line consistent-return

router.get('/', (req, res) => {
  res.send(`app-root, ${INDEX_NAME} mode`);
});

router.get('/me', (req, res) => {
  const { user } = req;
  res.status(200).json({ data: user });
});

router.use(crudOperations.prefix, crudOperations);
router.use(authentication.prefix, authentication);
router.use(courseOps.prefix, passport.authenticate('jwt', { session: false }), courseOps);

export default router;
