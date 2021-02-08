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
exports.storeToken = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.storeToken = ({ user_id, token }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedToken = yield prisma.app_notifications.create({
            data: {
                app_users: { connect: { id: user_id } },
                token,
                created_at: Date.now().toString(),
            },
        });
        return savedToken;
    }
    catch (error) {
        console.log('Error saving Token', error);
    }
});
//# sourceMappingURL=NotificationsServices.js.map