"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const validatePaymentCard = (cardDetails) => {
    const schema = joi_1.default.object({
        user_id: joi_1.default.number().required(),
        card_number: joi_1.default.string().min(16).required(),
        card_holder_name: joi_1.default.string().min(2).max(50).required(),
        card_exp_date: joi_1.default.string().required(),
    });
    return schema.validate(cardDetails);
};
exports.default = validatePaymentCard;
//# sourceMappingURL=paymentCard.js.map