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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PaymentCardServices {
    createCard(card_details) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, card_number, card_holder_name, card_exp_date, } = card_details;
            try {
                const newCard = yield prisma.app_user_cards.create({
                    data: {
                        app_users: {
                            connect: { id: user_id },
                        },
                        card_number,
                        card_holder_name,
                        card_exp_date: Number(card_exp_date),
                        created_at: Date.now().toString(),
                    },
                });
                return newCard;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    getCards(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cards = yield prisma.app_user_cards.findMany({
                    where: {
                        user_id,
                    },
                });
                return cards;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteCard(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedCard = yield prisma.app_user_cards.delete({
                    where: {
                        id,
                    },
                });
                return deletedCard;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = PaymentCardServices;
//# sourceMappingURL=PaymentCardServices.js.map