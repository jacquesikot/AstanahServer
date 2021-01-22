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
class ProductServices {
    getProducts(take) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.app_products.findMany({
                take: take ? take : 20,
                where: {
                    regular_price: {
                        gt: 1,
                    },
                },
            });
            if (!products)
                return [];
            return products;
        });
    }
    searchProducts(searchParam, take) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.app_products.findMany({
                take: take ? take : 20,
                where: {
                    title: {
                        contains: searchParam,
                    },
                    regular_price: {
                        gt: 1,
                    },
                },
            });
            if (!products)
                return [];
            return products;
        });
    }
    filterCategory(categoryName, take) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.app_products.findMany({
                take: take ? take : 20,
                where: {
                    categories: {
                        contains: categoryName.toLowerCase(),
                    },
                    regular_price: {
                        gt: 1,
                    },
                },
            });
            if (!products)
                return [];
            return products;
        });
    }
    filterSale(take) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield prisma.app_products.findMany({
                take: take ? take : 20,
                where: {
                    sale_price: {
                        gt: 1,
                    },
                },
            });
            if (!products)
                return [];
            return products;
        });
    }
}
exports.default = ProductServices;
//# sourceMappingURL=ProductServices.js.map