"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt = require("bcryptjs");
const hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};
exports.hashPassword = hashPassword;
const comparePasswords = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
};
exports.comparePasswords = comparePasswords;
//# sourceMappingURL=bcrypt.util.js.map