const defaultFormatterPath = "swift-format"

export function swiftFormatter(params: any) {
    const editor = params as TextEditor;
    try {
        const filePath = editor.document.path;
        if (filePath == null) {
            console.error("Cannot format an unsaved file.");
            return;
        }
        const formatterPath = nova.config.get("swift.swift-format-path") as string ?? defaultFormatterPath;
        const process = new Process(
            formatterPath,
            { args: ["format", "-in-place", filePath] }
        );
        process.start();
        console.log("format process start");
        let stderrString = "";
        process.onStderr((stderr) => { stderrString += stderr });
        let stdoutString = "";
        process.onStdout((stdout) => { stdoutString += stdout });
        if (stderrString.length != 0) {
            console.error("swift-format error: " + stderrString);
        }
        console.log("format out: #" + stdoutString + "#");
    } catch (err) {
        console.error("Error of Swift formatter: " + err);
    }
}