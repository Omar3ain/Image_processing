"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var mainRoute_1 = __importDefault(require("./routes/mainRoute"));
var process_1 = __importDefault(require("process"));
var app = (0, express_1.default)();
var port = process_1.default.env.PORT || 3000;
// middleware
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static('public'));
app.use(express_1.default.static('thumbnails'));
// main route for the app
app.use('/api', mainRoute_1.default);
// listening to the server
app.listen(port || 3000, function () {
    console.log("server is running at http://localhost:".concat(port));
});
exports.default = app;
