let code;
function getStreamCode() {
    code = window.prompt("Please enter the sharing code");
};

let conn;
function connectPeers() {
    conn = peer.connect(code);
}

var peer = new Peer('KeshavSoft', { key: 'myapikey' });

peer.on("connection", (connection) => {
    conn = connection;
});

connectPeers();


