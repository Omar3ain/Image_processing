"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imagesRoute_1 = __importDefault(require("./imagesRoute"));
var router = express_1.default.Router();
router.get('/', function (req, res) {
    res.send('Hello server');
});
router.use(imagesRoute_1.default);
exports.default = router;
