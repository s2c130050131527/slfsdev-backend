import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from './models';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // import otp from 'otplib';

import { SECRET_KEY } from '~/env';

// import { UserColl } from './model';
// import service from './service';

const controller = (() => {
  const router = Router();
  router.post('/signup', (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });
      // save the user
      newUser.save(err => {
        if (err) {
          return res.json({ success: false, msg: 'Username already exists.' });
        }
        res.json({ success: true, msg: 'Successful created new user.' });
      });
    }
  });

  router.post('/login', (req, res) => {
    User.findOne(
      {
        username: req.body.username,
      },
      function (err, user) {
        if (err) throw err;

        if (!user) {
          res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              // if user is found and password is right create a token
              const token = jwt.sign(user.toJSON(), SECRET_KEY);
              // return the information including token as JSON
              res.json({ success: true, token: `JWT ${token}`, user: req.body.username });
            } else {
              res
                .status(401)
                .send({ success: false, msg: 'Authentication failed. Wrong password.' });
            }
          });
        }
      },
    );
  });
  router.get('/logout', passport.authenticate('jwt', { session: false }), function (req, res) {
    req.logout();
    res.json({ success: true, msg: 'Sign out successfully.' });
  });

  return router;
})();

controller.prefix = '/authentication';

export default controller;
