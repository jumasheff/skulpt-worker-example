if ('function' === typeof importScripts) {

    self.importScripts('lib/skulpt.min.js')
    self.importScripts('lib/skulpt-stdlib.js')

    let readModule = module => (
        self.Sk.builtinFiles["files"][module]
    );

    let sendMessage = (name, message) => {
        self.postMessage(JSON.stringify({
            type: name,
            data: message
        }));
    }

    let run = source => {
        Sk.configure({
            read: readModule,
            output: function (output) {
                sendMessage('stdout', output);
            }
        });

        try {
            Sk.importMainWithBody("<stdin>", false, source);
        } catch (e) {
            sendMessage('stderr', {
                exception: e.tp$name,
                description: String(e)
            });
        }

        sendMessage('exit');
    }

    self.addEventListener('message', (e) => {
        run(e.data)
    });
}