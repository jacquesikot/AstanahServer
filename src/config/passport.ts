import passport from 'passport';
import GooglePassport from 'passport-google-oauth20';

import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} from '../constants';

const GoogleStrategy = GooglePassport.Strategy;

const userProfile = (profile: any) => {
  const { id, provider, photos, emails, displayName } = profile;
  let imageUrl = '';
  let email = '';
  if (emails && emails.length) {
    email = emails[0].value;
  }
  if (photos && photos.length) {
    imageUrl = photos[0].value;
  }
  return {
    social_id: id,
    name: displayName,
    image: imageUrl,
    email,
    provider,
  };
};

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email', 'openid'],
      passReqToCallback: true,
    },
    (_req: any, _accessToken: any, _refreshToken: any, profile: any, cb: any) =>
      cb(null, userProfile(profile))
  )
);
