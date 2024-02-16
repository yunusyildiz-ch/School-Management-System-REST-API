import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user.js'; 

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {

    const user = await User.findByPk(payload.userId);
    if (!user) {
      return done(null, false);
    }
   
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

passport.use(jwtStrategy);

export default passport;
