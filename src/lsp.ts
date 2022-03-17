const defaultLspPath = '/usr/bin/sourcekit-lsp';

export class SwiftLanguageServer {
    languageClient: LanguageClient | null = null;
    
    constructor() {
        nova.config.observe(
            'swift.language-server-path', 
            function(this: SwiftLanguageServer, newPath: string, _: string) { this.start(newPath) },
            this
        );
    }
    
    deactivate() {
        this.stop();
    }
    
    start(path: string | null) {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
        }
        // Use the default server path
        if (!path) {
            path = defaultLspPath;
        }
        
        const serverOptions = {
            path: path
        };
        const clientOptions = {
            // The set of document syntaxes for which the server is valid
            syntaxes: ['swift']
        };
        const client = new LanguageClient(
            'swift-langserver', 
            'Swift Language Server', 
            serverOptions, 
            clientOptions
        );
        try {
            // Start the client
            client.start();
            // Add the client to the subscriptions to be cleaned up
            nova.subscriptions.add(client);
            this.languageClient = client;
        } catch (err) {
            // If the .start() method throws, it's likely because the path to the language server is invalid
            
            if (nova.inDevMode()) {
                console.error(err);
            }
        }
        
    }
    
    stop() {
        if (this.languageClient) {
            this.languageClient.stop();
            nova.subscriptions.remove(this.languageClient);
            this.languageClient = null;
        }
    }
}