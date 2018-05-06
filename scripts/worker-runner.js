let stdOutEl = document.getElementById('output');
let stdErrEl = document.getElementById('error');
let codeInput = document.getElementById('code_editor');

function runWorker() {
    let code = codeInput !== null ? codeInput.value : '';

    if (typeof(w) == 'undefined') {
        var w = new Worker('scripts/skulpt.worker.js')
    }

    w.onmessage = function(event) {
        let data = JSON.parse(event.data);
        if (data.type === 'exit') {
            w.terminate();
            w = undefined;
        }
        if (data.type === 'stdout') {
            console.log(data.data);        
            stdOutEl.innerText += data.data;
        }
        if (data.type === 'stderr') {
            console.log('Error:', data.data);
            stdErrEl.innerText += data.data;
        }
    }
    w.postMessage(code)
}