"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const constants_1 = require("../constants");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const userProfile = (profile) => {
    const { id, name, emails, provider } = profile;
    let firstName;
    let lastName;
    let email;
    if (emails && emails.length)
        email = emails[0].value;
    if (name.givenName)
        firstName = name.givenName;
    if (name.familyName)
        lastName = name.familyName;
    return {
        id,
        firstName,
        lastName,
        email,
        provider,
    };
};
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
passport_1.default.use(new GoogleStrategy({
    clientID: constants_1.GOOGLE_CLIENT_ID,
    clientSecret: constants_1.GOOGLE_CLIENT_SECRET,
    callbackURL: constants_1.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
    passReqToCallback: true,
}, (_req, _accessToken, _refreshToken, profile, cb) => cb(null, userProfile(profile))));
//# sourceMappingURL=passport.js.map