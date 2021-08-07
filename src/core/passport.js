import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../authentication/models';

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport;
