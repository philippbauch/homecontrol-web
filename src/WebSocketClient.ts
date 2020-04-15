type WebSocketMessageHandler = (data: any) => void;

type WebSocketMessageCallback = {
  handler: WebSocketMessageHandler;
  id: number;
  type: WebSocketMessageType;
};

type WebSocketMessageType = "invitation";

type WebSocketMessage = {
  type: WebSocketMessageType;
  data: any;
};

let CALLBACK_IDENTIFIER = 0;

export class WebSocketClient {
  private cbs: WebSocketMessageCallback[];

  private url: string;

  private ws: WebSocket;

  constructor(url: string) {
    this.cbs = [];
    this.url = url;
    this.ws = new WebSocket(url);

    this.ws.onclose = this.handleClose;
    this.ws.onerror = this.handleError;
    this.ws.onmessage = this.handleMessage.bind(this);
    this.ws.onopen = this.handleOpen;
  }

  on(type: WebSocketMessageType, handler: WebSocketMessageHandler) {
    const id = CALLBACK_IDENTIFIER++;

    const callback: WebSocketMessageCallback = {
      handler,
      id,
      type,
    };

    this.cbs.push(callback);

    return this.off.bind(this, id);
  }

  off(id: number) {
    const index = this.cbs.findIndex((cb) => cb.id === id);

    if (index < 0) {
      return;
    }

    this.cbs.splice(index, 1);
  }

  private handleClose() {
    console.log("Closed");
  }

  private handleError() {
    console.log("Error occured");
  }

  private handleMessage(event: MessageEvent) {
    const message: WebSocketMessage = JSON.parse(event.data);

    console.log("Message received:", message);

    this.cbs
      .filter((cb) => cb.type === message.type)
      .forEach((cb) => cb.handler(message.data));
  }

  private handleOpen() {
    console.log("Opened");
  }
}

const WS_URL = process.env.REACT_APP_WS_URL;

if (!WS_URL) {
  throw new Error("WS_URL is not specified");
}

export default new WebSocketClient(WS_URL);
