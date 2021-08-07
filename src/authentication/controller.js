import { Router } from 'express';
import passport from 'passport';
import User from './models';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // import otp from 'otplib';

// import { SECRET_KEY } from '~/env';

// import { UserColl } from './model';
// import service from './service';

const controller = (() => {
  const router = Router();
  router.post('/signup', (req, res, next) => {
    User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
      }
      passport.authenticate('local')(req, res, () => {
        res.status(201).json({ data: user });
      });
    });
  });
  router.post('/login', passport.authenticate('local'), (req, res) => {
    if (req.user) {
      res.status(200).json({
        data: {
          user: req.user.username,
        },
      });
      return;
    }
    res.status(401).json({ error: 'Unauthorized' });
  });

  return router;
})();

controller.prefix = '/authentication';

export default controller;
