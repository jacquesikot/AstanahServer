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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const validation_1 = require("../validation");
const services_1 = require("../services");
const middlewares_1 = require("../middlewares");
const services = new services_1.UserServices();
class User {
    constructor() {
        this.path = '/api/users';
        this.router = express.Router();
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = validation_1.validateUser(req.body);
                if (error)
                    return res.status(400).send(error.details[0].message);
                let user = yield services.findUser(req.body);
                if (user)
                    return res.status(400).send('User already registered');
                const response = yield services.createUser(req.body);
                const token = yield services.getToken(response);
                res.header('x-auth-token', token).send(response);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = yield services.findUserById(req.user.id);
            res.send(user);
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield services.updateUser(req.body);
                res.send(user);
            }
            catch (e) {
                console.error(e);
            }
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.addUser);
        this.router.get(this.path, middlewares_1.auth, this.getUser);
        this.router.post(this.path + `/update`, middlewares_1.auth, this.updateUser);
    }
}
exports.default = User;
//# sourceMappingURL=Users.js.map