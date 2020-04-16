type WebSocketMessage = {
  type: WebSocketMessageType;
  data: any;
};

type WebSocketMessageCallback = (data: any) => void;

type WebSocketMessageSubscription = {
  callback: WebSocketMessageCallback;
  id: number;
  type: WebSocketMessageType;
};

type WebSocketMessageType = "invitation";

type WebSocketStatusType = "open" | "close" | "error";

type WebSocketStatusCallback = () => void;

type WebSocketStatusListener = {
  callback: WebSocketStatusCallback;
  id: number;
  status: WebSocketStatusType;
};

let LISTENER_IDENTIFIER = 0;
let SUBSCRIPTION_IDENTIFIER = 0;

export class WebSocketClient {
  private listeners: WebSocketStatusListener[];
  private subscriptions: WebSocketMessageSubscription[];
  private url: string;
  private ws: WebSocket | null = null;

  constructor(url: string) {
    this.listeners = [];
    this.subscriptions = [];
    this.url = url;
  }

  private emit(status: WebSocketStatusType) {
    this.listeners
      .filter((l) => l.status === status)
      .forEach((l) => l.callback());
  }

  private handleClose() {
    this.emit("close");
  }

  private handleError() {
    this.emit("error");
  }

  private handleMessage(event: MessageEvent) {
    const message: WebSocketMessage = JSON.parse(event.data);

    this.publish(message);
  }

  private handleOpen() {
    this.emit("open");
  }

  private publish(message: WebSocketMessage) {
    this.subscriptions
      .filter((s) => s.type === message.type)
      .forEach((s) => s.callback(message.data));
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

  on(status: WebSocketStatusType, callback: WebSocketStatusCallback) {
    const id = LISTENER_IDENTIFIER++;

    const listener: WebSocketStatusListener = {
      callback,
      id,
      status,
    };

    this.listeners.push(listener);

    return this.unsubscribe.bind(this, id);
  }

  off(id: number) {
    const index = this.listeners.findIndex((s) => s.id === id);

    if (index < 0) {
      return;
    }

    this.listeners.splice(index, 1);
  }

  subscribe(type: WebSocketMessageType, callback: WebSocketMessageCallback) {
    const id = SUBSCRIPTION_IDENTIFIER++;

    const subscription: WebSocketMessageSubscription = {
      callback,
      id,
      type,
    };

    this.subscriptions.push(subscription);

    return this.unsubscribe.bind(this, id);
  }

  unsubscribe(id: number) {
    const index = this.subscriptions.findIndex((s) => s.id === id);

    if (index < 0) {
      return;
    }

    this.subscriptions.splice(index, 1);
  }
}

const WS_URL = process.env.REACT_APP_WS_URL;

if (!WS_URL) {
  throw new Error("WS_URL is not specified");
}

export default new WebSocketClient(WS_URL);
