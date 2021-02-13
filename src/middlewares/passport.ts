import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from '../constants';
import { IOauthUser } from 'src/types';

const GoogleStrategy = GooglePassport.Strategy;

const userProfile = (profile: IOauthUser) => {
  const { id, name, emails, provider } = profile;
  let firstName;
  let lastName;
  let email;

  if (emails && emails.length) email = emails[0].value;
  if (name.givenName) firstName = name.givenName;
  if (name.familyName) lastName = name.familyName;

  return {
    id,
    firstName,
    lastName,
    email,
    provider,
  };
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      passReqToCallback: true,
    },
    (_req: any, _accessToken: any, _refreshToken: any, profile: any, cb: any) =>
      cb(null, userProfile(profile))
  )
);
