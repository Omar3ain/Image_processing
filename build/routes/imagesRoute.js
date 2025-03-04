"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var names_1 = __importDefault(require("../utilties/names"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var ResizingFunction_1 = __importDefault(require("../utilties/ResizingFunction"));
var router = express_1.default.Router();
router.get('/images', function (req, res) {
    var fileName = req.query.filename;
    var width = req.query.width;
    var height = req.query.height;
    var name = names_1.default.includes(fileName);
    var imgLocation = path_1.default.resolve('./', "public/images/".concat(fileName, ".jpg"));
    // checks if the name exists:
    if (names_1.default === undefined) {
        return res.status(400).send('there is no image with that name');
    }
    // checks if the name exists in the request query:
    else if (!Object.prototype.hasOwnProperty.call(req.query, 'filename')) {
        return res
            .status(200)
            .send('Put the image name and width-height that you want!');
    }
    // checks if the name exists in the avaliable images :
    else if (name === false) {
        return res.status(404).send('there is no image with that name');
    }
    // checks for the numbers of width and height so that the app don't crash:
    else if (+width < 1 ||
        +width > 2000 ||
        +height < 1 ||
        +height > 2000 ||
        isNaN(+height) ||
        isNaN(+width)) {
        return res
            .status(400)
            .send('please put vaild numbers for width and height between 0 and 2000!');
    }
    // doing the resizing opratortion:
    else {
        fs_1.default.stat('thumbnails', function (err) {
            if (!err) {
                console.log('folder exists');
            }
            else if (err.code === 'ENOENT') {
                fs_1.default.mkdir('thumbnails', function (err) {
                    console.log(err);
                });
            }
        });
        // location of the image
        var imageExists = path_1.default.resolve('./', "thumbnails/".concat(fileName, " width-").concat(width, " height-").concat(height, ".jpg"));
        //checks if the image already exists if not create new one
        fs_1.default.stat(imageExists, function (err) {
            //if file exsits return the file
            if (!err) {
                var imgLocationResized = path_1.default.resolve('./', "thumbnails/".concat(fileName, " width-").concat(width, " height-").concat(height, ".jpg"));
                return res.sendFile(imgLocationResized);
                //if file does not exist make one and return it
            }
            else if (err.code === 'ENOENT') {
                (0, ResizingFunction_1.default)(imgLocation, width, height, fileName).then(function () {
                    var imgLocationResized = path_1.default.resolve('./', "thumbnails/".concat(fileName, " width-").concat(width, " height-").concat(height, ".jpg"));
                    return res.sendFile(imgLocationResized);
                });
            }
        });
    }
});
exports.default = router;
