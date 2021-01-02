"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express = __importStar(require("express"));
const passport_1 = __importDefault(require("passport"));
const validation_1 = require("../validation");
const services_1 = require("../services");
const services = new services_1.UserServices();
class Auth {
    constructor() {
        this.path = '/api/auth';
        this.router = express.Router();
        this.loginUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = validation_1.validateAuth(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = yield services.findUser(req.body);
            if (!user)
                return res.status(400).send('Invalid email and/or password');
            const validPassword = yield services.validatePassword(req.body.password, user.password);
            if (!validPassword)
                return res.status(400).send('Invalid email and/or password');
            const token = yield services.getToken(user);
            res.send(token);
        });
        this.loginGoogleUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validation_1.validateGoogleAuth(req.user);
                if (error)
                    return res.status(400).send(error.details[0].message);
                const user = yield services.findOauthUser(req.user.email);
                if (!user) {
                    const newUser = yield services.createGoogleUser(req.user);
                    const newUserToken = yield services.getToken(newUser);
                    res.send(newUserToken);
                }
                else if (user) {
                    const token = yield services.getToken(user);
                    res.send(token);
                }
            }
            catch (e) {
                console.error(e);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path + `/local`, this.loginUser);
        this.router.get(this.path + `/google`, passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
        this.router.get(this.path + `/google/callback`, passport_1.default.authenticate('google', { failureRedirect: '/google/error' }), this.loginGoogleUser);
        this.router.get(this.path + `/google/error`, function (_req, res) {
            res.redirect('/');
        });
        this.router.get(this.path + `/google/logout`, function (req, res) {
            req.logout();
            res.redirect('/');
        });
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map