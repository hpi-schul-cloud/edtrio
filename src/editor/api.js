import Api from './../models/Api';

class SocketApi extends Api {
    constructor(conn) {
        super();

        this.connection = conn;
    }

    sendData(data) {
        this.connection.send(JSON.stringify(data));
    }

    getData() {
        return {};
    }
}

const ws = new WebSocket('ws://localhost:3030');

ws.onopen = () => {
    console.log('Connection started..');
}

const api = new SocketApi(ws);

export default api;