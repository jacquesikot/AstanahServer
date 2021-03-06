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
class BillingServices {
    newBilling(billing_props) {
        return __awaiter(this, void 0, void 0, function* () {
            const billing = yield prisma.app_billing_address.create({
                data: {
                    app_users: {
                        connect: { id: billing_props.user_id },
                    },
                    first_name: billing_props.first_name,
                    last_name: billing_props.last_name,
                    address: billing_props.address,
                    city: billing_props.city,
                    state: billing_props.state,
                    postcode: billing_props.postcode,
                    country: billing_props.country,
                    email: billing_props.email,
                    phone: billing_props.phone,
                },
            });
            return billing;
        });
    }
}
exports.default = BillingServices;
//# sourceMappingURL=BillingService.js.map