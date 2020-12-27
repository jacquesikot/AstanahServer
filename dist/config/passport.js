"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const services_1 = require("../services");
const services = new services_1.UserServices();
const constants_1 = require("../constants");
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
const userAuth = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { emails, name } = profile;
        let email = '';
        let firstName = '';
        let lastName = '';
        if (emails && emails.length) {
            email = emails[0].value;
        }
        if (name.familyName) {
            lastName = name.familyName;
        }
        if (name.givenName) {
            firstName = name.givenName;
        }
        const user = yield services.findOauthUser(email);
        if (!user)
            yield services.createGoogleUser(profile);
        return user;
    }
    catch (e) {
        console.error(e);
    }
});
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
    scope: ['profile'],
    passReqToCallback: true,
}, (_req, _accessToken, _refreshToken, profile, cb) => cb(null, userAuth(profile))));
//# sourceMappingURL=passport.js.map