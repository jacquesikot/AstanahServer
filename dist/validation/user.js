"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGoogleAuth = exports.validateAuth = void 0;
const joi_1 = __importDefault(require("joi"));
const validateUser = (user) => {
    const schema = joi_1.default.object({
        first_name: joi_1.default.string().min(2).max(45).required(),
        last_name: joi_1.default.string().min(2).max(45),
        email: joi_1.default.string().email().min(3).max(45).required(),
        password: joi_1.default.string().min(3).max(25).required(),
        googleId: joi_1.default.string().min(3).max(45),
        facebookId: joi_1.default.string().min(3).max(45),
    });
    return schema.validate(user);
};
exports.validateAuth = (credential) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(3).max(255).required(),
    });
    return schema.validate(credential);
};
exports.validateGoogleAuth = (credentials) => {
    const schema = joi_1.default.object({
        id: joi_1.default.string().required(),
        firstName: joi_1.default.string(),
        lastName: joi_1.default.string(),
        email: joi_1.default.string().email(),
        provider: joi_1.default.string(),
    });
    return schema.validate(credentials);
};
exports.default = validateUser;
//# sourceMappingURL=user.js.map