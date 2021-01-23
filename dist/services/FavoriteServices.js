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
class FavoriteServices {
    getFavorites(id, take) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favorites = yield prisma.app_user_likes.findMany({
                    take: take ? take : 50,
                    where: {
                        user_id: id,
                    },
                });
                if (!favorites)
                    return [];
                const res = yield favorites.map((favorite) => __awaiter(this, void 0, void 0, function* () {
                    const favs = yield prisma.app_products.findOne({
                        where: {
                            id: favorite.product_id,
                        },
                    });
                    return Object.assign({ favorite_id: favorite.id }, favs);
                }));
                return yield Promise.all(res);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addToFavorite({ user_id, product_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favorite = yield prisma.app_user_likes.create({
                    data: {
                        app_users: { connect: { id: user_id } },
                        app_products: { connect: { id: product_id } },
                        created_at: Date.now().toString(),
                    },
                });
                return favorite;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    deleteFavorite(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedFavorite = yield prisma.app_user_likes.delete({
                    where: {
                        id,
                    },
                });
                return deletedFavorite;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = FavoriteServices;
//# sourceMappingURL=FavoriteServices.js.map