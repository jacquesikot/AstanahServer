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
class OrderServices {
    getOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield prisma.app_orders.findMany();
                if (!orders)
                    return [];
                return orders;
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    newOrder(order_props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, billing_id, payment_method, set_paid, products, } = order_props;
            const order = yield prisma.app_orders.create({
                data: {
                    payment_method,
                    set_paid,
                    app_users: {
                        connect: { id: user_id },
                    },
                    app_billing_address: {
                        connect: { id: billing_id },
                    },
                },
            });
            products.map((p) => __awaiter(this, void 0, void 0, function* () {
                yield prisma.app_order_details.create({
                    data: {
                        quantity: p.quantity,
                        app_products: {
                            connect: { id: p.product_id },
                        },
                        app_orders: {
                            connect: { id: order.id },
                        },
                        app_users: {
                            connect: { id: order_props.user_id },
                        },
                    },
                });
                return;
            }));
            return order;
        });
    }
    getUserOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield prisma.app_orders.findMany({
                where: {
                    user_id,
                },
            });
            return orders;
        });
    }
}
exports.default = OrderServices;
//# sourceMappingURL=OrderServices.js.map