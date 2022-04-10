import { InputMessage, OutputMessage } from '../types';
import fetch from 'node-fetch';
import { createClient }from 'redis';

const redisClient = createClient();
export class MessageListener {
    messageHandlers: Map<number, ((message: InputMessage) => void)> = new Map();
    webhookToken: string;

    constructor(webhookToken: string,) {
        this.webhookToken = webhookToken;
        this.request('setWebhook', { url: 'https://chatbotsmcntelecom.com/' });
    }

    async handleMessage(message: InputMessage) {
        if (!this.messageHandlers.size) {
            console.log(`WARNING: Empty handlers map`);
            return;
        }
        const chat_id = message.chat.id;
        const element_id = Number(await redisClient.get(chat_id));
        if (!element_id) {
            redisClient.set(chat_id, 0);
            this.messageHandlers.get(0)!(message);
            return;
        } else if (!this.messageHandlers.has(element_id)) {
            console.log(`WARNING: client has wrong element_id ${chat_id} ${element_id}`);
            return;
        }
        this.messageHandlers.get(element_id)!(message);
        redisClient.del(chat_id);
        redisClient.set(chat_id, element_id + 1);
    }

    setHandlers(handlers: Map<number, ((message: InputMessage) => void)>) {
        this.messageHandlers = handlers;
    }

    async request(command: string, body: any) {
        let response = await (await fetch(`https://api.telegram.org/bot${this.webhookToken}/${command}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })).json();
        if (!response?.ok) console.log(response);
        return response;
    }

    sendMessage(message: OutputMessage) {
        this.request('sendMessage', message);
    }
}
