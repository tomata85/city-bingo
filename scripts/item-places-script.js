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
exports.__esModule = true;
exports.main = exports.getPlaceDetails = exports.ITEM_PLACES = void 0;
var https = require("https");
/* eslint-disable @typescript-eslint/explicit-function-return-type */
var BASE_URL = 'https://19iqaec2c8.execute-api.eu-west-1.amazonaws.com/default';
exports.ITEM_PLACES = {
    item_g: [
        // Snug Cafe
        'ChIJm5RpBEyvqxQR-gheH8LfSZM',
        // Vintage
        'ChIJqSGnCPuvqxQROvEQxQhsLTc',
        // Cafe Retro
        'ChIJLWX7aKOuqxQRRQUC71C0ri4',
        // Le Petite Nicholas
        'ChIJHY6LYKKuqxQRuN1P3moLawA',
        // French Guy
        'ChIJg0aZGPqvqxQRvnChs7DttJo'
    ],
    item_h: [
        'ChIJQcjFOjqsqxQRadxHlO8Wzw0',
        'ChIJP0rfCFOvqxQRDBL0FnMus80'
    ],
    item_a: [
        'ChIJOzPghfhRpEARDQTKL1t2t7A',
        'ChIJq6qqqlqoqxQR7YoSEV8YGpA',
        'ChIJZztZS1mvqxQR27eeUF_o7Dk',
        'ChIJKQSQp1apqxQRQWeTIPEnQxA',
        'ChIJm0c-S5CnqxQRvYI3rBHsZsU'
    ]
};
function getPlaceDetails(itemId, placeId) {
    // try {
    https.get("".concat(BASE_URL, "/getGoogleMapPlaces?placeId=").concat(placeId), function (res) {
        var data = '';
        // A chunk of data has been received.
        res.on('data', function (chunk) {
            data = data.concat(chunk);
        });
        // The whole response has been received.
        res.on('end', function () {
            var placeObject = Object.assign(JSON.parse(data), { itemId: itemId }, { placeId: placeId });
            console.log(placeObject);
        });
    }).on('error', function (err) {
        console.log('Error: ' + err.message);
    });
    //   const res = await fetch(
    //     `${BASE_URL}/getGoogleMapPlaces?placeId=${placeId}`)
    //   const placeDetails = await res.json()
    //   return placeDetails
    // } catch (error) {
    //   console.error('Error:', error)
    // }
}
exports.getPlaceDetails = getPlaceDetails;
function main() {
    var _this = this;
    console.log('LALALALALA');
    // const mockData = { x: 'y' }
    // writeFileSync('./item-places-details.ts', JSON.stringify(mockData), {
    //   flag: 'w'
    // })
    Object.entries(exports.ITEM_PLACES).map(function (_a) {
        var itemId = _a[0], placesList = _a[1];
        return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                placesList.map(function (placeId) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        getPlaceDetails(itemId, placeId);
                        return [2 /*return*/];
                    });
                }); });
                return [2 /*return*/];
            });
        });
    });
}
exports.main = main;
main();
