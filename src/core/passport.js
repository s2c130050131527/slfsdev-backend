import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleTokenStrategy from '@smth-for/passport-google-access-token';

import { SECRET_KEY, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '~/env';
import { Authentication } from '~/authentication';

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    async (jwtPayload, done) => {
      try {
        // TODO: remove it
        if (Date.now() > jwtPayload.expires) return done('Token expired');

        const find = { username: jwtPayload.username };
        const user = await Authentication.UserColl.findOne(find).exec();
        return done(null, user);

        // const refreshTokens = await Authentication.model.RefreshToken.find({ user: user.id });
      } catch (error) {
        return done(error);
      }
    },
  ),
);

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/authentication/google/callback',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
      ],
    },
    async (accessToken, refreshToken, profile, done) => {
      const jsonProfile = profile._json;
      const user = await Authentication.UserColl.findOne({ id: jsonProfile.sub }).exec();
      if (!user) {
        const userObj = {
          id: jsonProfile.sub,
          name: jsonProfile.name,
          picture: jsonProfile.picture,
          permissions: [],
          email: jsonProfile.email,
        };
        const userA = new Authentication.UserColl(userObj);
        await userA.save();
        return done(null, userObj);
      }
      return done(null, user);
    },
  ),
);

// https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
passport.use(
  new GoogleTokenStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((obj, done) => {
  Authentication.UserColl.findOne({ id: obj }).then(user => {
    done(null, user);
  });
});

export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated() && req.user) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

export default passport;
