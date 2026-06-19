//Настройка веб сокета
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

class WebSocketClient {
    constructor(url) {
        this.subscriptions = {
            chats: [],
            users: null
        }

        this.onConnectedCallbacks = [];

        this.client = new Client({
            webSocketFactory: () => new SockJS(url),
            debug(str){
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        this.client.onConnect = (frame) => {
            console.log('STOMP Connected');
            this.onConnectedCallbacks.forEach(cb => cb()); // Выполнить всю посторонюю логику(подписки и т.п)
        };

        this.client.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        }

        this.client.activate();
    }

    pushOnConnectedCallback(callback){
        this.onConnectedCallbacks.push(callback);
    }

    subscribe(type, destination, callback){
        if (this.client && this.client.connected){
            if (type === "chats"){
                this.subscriptions.chats.push(this.client.subscribe(destination, callback));
            }
            else if (type === "users"){
                this.subscriptions.users = this.client.subscribe(destination, callback);
            }
        }
    }

    disconnect(){
        this.client.deactivate();
    }
}

export default WebSocketClient;