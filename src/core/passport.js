/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable func-names */
import { SECRET_KEY } from '~/env';

const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

// load up the user model
const User = require('../authentication/models');

export default function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = SECRET_KEY;
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne({ id: jwt_payload.id }, function (err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    }),
  );
};
