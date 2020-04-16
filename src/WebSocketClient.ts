type WebSocketCallback = (...args: any[]) => void;

type WebSocketEvent = "open" | "close" | "error" | "message";

type WebSocketListener = {
  callback: WebSocketCallback;
  event: WebSocketEvent;
  id: number;
};

type WebSocketMessage = {
  type: WebSocketMessageType;
  data: any;
};

type WebSocketMessageCallback = (data: any) => void;

type WebSocketMessageType = "invitation";

let LISTENER_IDENTIFIER = 0;

export class WebSocketClient {
  private listeners: WebSocketListener[];
  private url: string;
  private ws: WebSocket | null = null;

  constructor(url: string) {
    this.listeners = [];
    this.url = url;
  }

  private emit(event: WebSocketEvent, ...args: any[]) {
    this.listeners
      .filter((l) => l.event === event)
      .forEach((l) => l.callback(...args));
  }

  private handleClose() {
    this.emit("close");
  }

  private handleError() {
    this.emit("error");
  }

  private handleMessage(event: MessageEvent) {
    const message: WebSocketMessage = JSON.parse(event.data);

    this.emit("message", message);
  }

  private handleOpen() {
    this.emit("open");
  }

  connect() {
    if (this.isConnected()) {
      return;
    }

    this.ws = new WebSocket(this.url);

    this.ws.onclose = this.handleClose.bind(this);
    this.ws.onerror = this.handleError.bind(this);
    this.ws.onmessage = this.handleMessage.bind(this);
    this.ws.onopen = this.handleOpen.bind(this);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }

    this.ws = null;
  }

  isConnected(): boolean {
    return !!this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  on(event: WebSocketEvent, callback: WebSocketCallback) {
    const id = LISTENER_IDENTIFIER++;

    const listener: WebSocketListener = {
      callback,
      event,
      id,
    };

    this.listeners.push(listener);

    return this.off.bind(this, id);
  }

  off(id: number) {
    const index = this.listeners.findIndex((s) => s.id === id);

    if (index < 0) {
      return;
    }

    this.listeners.splice(index, 1);
  }

  subscribe(type: WebSocketMessageType, callback: WebSocketMessageCallback) {
    function _callback(message: WebSocketMessage) {
      if (message.type !== type) {
        return;
      }

      callback(message.data);
    }

    return this.on("message", _callback);
  }
}

const WS_URL = process.env.REACT_APP_WS_URL;

if (!WS_URL) {
  throw new Error("WS_URL is not specified");
}

export default new WebSocketClient(WS_URL);
