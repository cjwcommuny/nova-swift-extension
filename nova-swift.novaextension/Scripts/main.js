"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const lsp_1 = require("./lsp");
const formatter_1 = require("./formatter");
let langserver = null;
const activate = function () {
    langserver = new lsp_1.SwiftLanguageServer();
};
exports.activate = activate;
const deactivate = function () {
    if (langserver) {
        langserver.stop();
        langserver = null;
    }
};
exports.deactivate = deactivate;
nova.commands.register("swift.format", formatter_1.swiftFormatter);
