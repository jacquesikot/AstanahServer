"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_forge_1 = __importDefault(require("node-forge"));
function encrypt(key, text) {
    var cipher = node_forge_1.default.cipher.createCipher('3DES-ECB', node_forge_1.default.util.createBuffer(key));
    cipher.start({ iv: '' });
    cipher.update(node_forge_1.default.util.createBuffer(text, 'utf8'));
    cipher.finish();
    var encrypted = cipher.output;
    return node_forge_1.default.util.encode64(encrypted.getBytes());
}
exports.default = {
    encrypt,
};
//# sourceMappingURL=CardPaymentServices.js.map