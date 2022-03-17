"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swiftFormatter = void 0;
const defaultFormatterPath = "swift-format";
function swiftFormatter(params) {
    var _a;
    const editor = params;
    try {
        const filePath = editor.document.path;
        if (filePath == null) {
            console.error("Cannot format an unsaved file.");
            return;
        }
        const formatterPath = (_a = nova.config.get("swift.swift-format-path")) !== null && _a !== void 0 ? _a : defaultFormatterPath;
        const process = new Process(formatterPath, { args: ["format", "-in-place", filePath] });
        process.start();
        console.log("format process start");
        let stderrString = "";
        process.onStderr((stderr) => { stderrString += stderr; });
        let stdoutString = "";
        process.onStdout((stdout) => { stdoutString += stdout; });
        if (stderrString.length != 0) {
            console.error("swift-format error: " + stderrString);
        }
        console.log("format out: #" + stdoutString + "#");
    }
    catch (err) {
        console.error("Error of Swift formatter: " + err);
    }
}
exports.swiftFormatter = swiftFormatter;
