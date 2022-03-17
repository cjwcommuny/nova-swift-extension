import { SwiftLanguageServer } from "./lsp"
import { swiftFormatter } from "./formatter"

let langserver: SwiftLanguageServer | null = null;

export const activate = function() {
    langserver = new SwiftLanguageServer();
}

export const deactivate = function() {
    if (langserver) {
        langserver.stop();
        langserver = null;
    }
}

nova.commands.register("swift.format", swiftFormatter);