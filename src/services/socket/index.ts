import type { Server as HttpServer } from "node:http";
import { type Socket as IOSocket, type Namespace, Server } from "socket.io";
import config from "../../config";

export class Socket {
	io: Server;
	private namespaces: Map<string, Namespace>;

	constructor(httpServer: HttpServer) {
		this.io = new Server(httpServer, {
			cors: {
				origin: "*",
			},
		});
		this.namespaces = new Map();
		this.init();
	}

	private init = () => {
		this.io.use(async (socket, next) => {
			try {
				if (socket.handshake.auth.token === config.socketHandshake) {
					next();
				} else {
					const err = new Error("unauthorized");
					next(err);
				}
			} catch (e) {
				next(new Error("unauthorized"));
			}
		});
	};

	public createNamespace = (spaceName: string): Namespace => {
		const namespace = this.io.of(spaceName);
		this.namespaces.set(spaceName, namespace);
		return namespace;
	};

	private getOrCreateNamespace = (spaceName: string): Namespace => {
		if (!this.namespaces.has(spaceName)) {
			return this.createNamespace(spaceName);
		}
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		return this.namespaces.get(spaceName)!;
	};

	public onConnect = (space: Namespace, cb: (socket: IOSocket) => void) => {
		space.on("connection", (socket: IOSocket) => {
			cb(socket);
		});
	};

	public emitToClient = <T>(name: string, space: string, data: T) => {
		const namespace = this.getOrCreateNamespace(space);
		namespace.emit(name, data);
	};
}
