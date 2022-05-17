"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sharp_1 = __importDefault(require("sharp"));
var resize = function (imgLocation, width, height, fileName) {
    return (0, sharp_1.default)(imgLocation)
        .resize(parseInt(width), parseInt(height))
        .toFile("thumbnails/".concat(fileName, " width-").concat(width, " height-").concat(height, ".jpg"));
};
exports.default = resize;
