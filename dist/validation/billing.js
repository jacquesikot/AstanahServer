"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateBilling = (billing) => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.number().min(1).required(),
        first_name: joi_1.default.string().min(3).max(50).required(),
        last_name: joi_1.default.string().min(3).max(50).required(),
        address: joi_1.default.string().min(3).max(255).required(),
        city: joi_1.default.string().min(3).max(255).required(),
        state: joi_1.default.string().min(3).max(255).required(),
        postcode: joi_1.default.string().min(3).max(255).required(),
        country: joi_1.default.string().min(3).max(255).required(),
        phone: joi_1.default.string().min(3).max(255).required(),
    });
    return schema.validate(billing);
};
exports.default = validateBilling;
//# sourceMappingURL=billing.js.map