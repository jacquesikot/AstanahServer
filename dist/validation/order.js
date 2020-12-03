"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validateOrder = (order) => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.number().min(1).required(),
        payment_method: joi_1.default.string().min(3).max(15).required(),
        set_paid: joi_1.default.boolean().required(),
        billing_id: joi_1.default.number().required(),
        products: joi_1.default.object(),
    });
    return schema.validate(order);
};
exports.default = validateOrder;
//# sourceMappingURL=order.js.map