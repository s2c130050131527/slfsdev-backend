import { Router } from 'express';
import passport from 'passport';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // import otp from 'otplib';

// import { SECRET_KEY } from '~/env';

// import { UserColl } from './model';
// import service from './service';

const controller = (() => {
  const router = Router();
  router.get('/google/login', (req, res, next) => {
    passport.authenticate('google')(req, res, next);
  });

  router.get(
    '/google/callback',
    passport.authenticate('google', {
      failureRedirect: 'http://localhost:3000/login',
    }),
    (req, res) => {
      if (req.user && req.user.permissions.length === 0) {
        res.redirect('http://localhost:3000/settings');
      }
      res.redirect('http://localhost:3000/main');
    },
  );

  router.post('/google/token', passport.authenticate('google-token'), (req, res) => {
    res.json({ user: req.user });
  });

  return router;
})();

controller.prefix = '/authentication';

export default controller;
