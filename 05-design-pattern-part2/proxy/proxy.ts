export {}

interface Server {
    handle(userId: string);
}

class RealServer implements Server {
    handle(userId: string) {
        console.log(`${userId}の処理を実行中`);
    }
}

class Proxy implements Server {
    constructor(private server: Server) {}

    private authorize(userId: string) {
        const authorizedUserId = ["1", "2", "3"];
        if (!authorizedUserId.includes(userId)) {
            throw new Error("操作が許可されていません");
        }
    }

    handle(userId: string) {
        this.authorize(userId);

        console.log("処理を開始します");
        this.server.handle(userId);
        console.log("処理が終了しました");
    }
}

function run() {
    const server = new RealServer();
    const proxy = new Proxy(server);

    proxy.handle("5");
}

run();