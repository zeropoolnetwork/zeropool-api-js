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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = exports.Balance = void 0;
var coin_type_1 = require("./coin-type");
var hdwallet_babyjub_1 = require("hdwallet-babyjub");
var Balance = /** @class */ (function () {
    function Balance() {
    }
    return Balance;
}());
exports.Balance = Balance;
var Coin = /** @class */ (function () {
    function Coin(mnemonic) {
        this.mnemonic = mnemonic;
    }
    Coin.prototype.getPrivateAddress = function (account, index) {
        var path = coin_type_1.CoinType.privateDerivationPath(this.getCoinType(), account);
        console.warn('TODO getPrivateAddress');
        var K = hdwallet_babyjub_1.Pubkey(this.mnemonic, path).K;
        // TODO: Derive with libzeropool-wasm
        // const { k } = Privkey(this.mnemonic, path);
        return '';
    };
    /**
     * Get balances for specified number of accounts with offset.
     * @param numAccounts
     * @param offset
     */
    Coin.prototype.getBalances = function (numAccounts, offset) {
        if (offset === void 0) { offset = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var promises, _loop_1, this_1, account;
            var _this = this;
            return __generator(this, function (_a) {
                promises = [];
                _loop_1 = function (account) {
                    var promise = this_1.getBalance(account)
                        .catch(function (_err) { return '0'; }) // TODO: Log errors
                        .then(function (balance) { return ({
                        address: _this.getAddress(account),
                        balance: balance,
                    }); });
                    promises.push(promise);
                };
                this_1 = this;
                for (account = offset; account < offset + numAccounts; ++account) {
                    _loop_1(account);
                }
                return [2 /*return*/, Promise.all(promises)];
            });
        });
    };
    return Coin;
}());
exports.Coin = Coin;
//# sourceMappingURL=coin.js.map