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
const bcrypt_1 = __importDefault(require("bcrypt"));
const _ = __importStar(require("lodash"));
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const constants_1 = require("../constants");
const prisma = new client_1.PrismaClient();
class UserService {
    findUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield prisma.app_users.findOne({
                    where: { email: user_params.email },
                });
                return user;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    findOauthUser(user_email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield prisma.app_users.findOne({
                    where: { email: user_email },
                });
                return user;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield prisma.app_users.findOne({ where: { id: id } });
                return user;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    createUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                user_params.password = yield bcrypt_1.default.hash(user_params.password, salt);
                let user = yield prisma.app_users.create({
                    data: {
                        first_name: user_params.first_name,
                        last_name: user_params.last_name,
                        email: user_params.email,
                        password: user_params.password,
                    },
                });
                return _.pick(user, ['id', 'first_name', 'last_name', 'email']);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    createGoogleUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, firstName, lastName, email } = user_params;
                const salt = yield bcrypt_1.default.genSalt(10);
                const password = yield bcrypt_1.default.hash(id, salt);
                let user = yield prisma.app_users.create({
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        google_id: id,
                        password,
                    },
                });
                return _.pick(user, ['id', 'first_name', 'last_name', 'email']);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    updateUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, first_name, last_name } = user_params;
                const user = yield prisma.app_users.update({
                    where: {
                        id,
                    },
                    data: {
                        first_name,
                        last_name,
                    },
                });
                return user;
            }
            catch (e) {
                console.error;
            }
        });
    }
    validatePassword(reqPassword, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const validPassword = yield bcrypt_1.default.compare(reqPassword, userPassword);
                if (!validPassword)
                    return false;
                return true;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    getToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, first_name, last_name, email } = user;
                const token = jsonwebtoken_1.default.sign({ id, first_name, last_name, email }, constants_1.JWT_KEY);
                return token.toString();
            }
            catch (e) {
                console.error(e);
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserServices.js.map