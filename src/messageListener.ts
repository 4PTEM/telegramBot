import { InputMessage, OutputMessage, ScenarioMap } from './types';
import fetch from 'node-fetch';
import { createClient }from 'redis';

const redisClient = createClient();
redisClient.connect();
export class MessageListener {
    messageHandlers: ScenarioMap = new Map();
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
        const chat_id: string = message.chat.id;
        const element_id: string = await redisClient.get(chat_id) || 'init';
        const handler = this.messageHandlers.get(element_id);
        if (!handler) {
            console.log(`WARNING: client has wrong element_id ${chat_id} ${element_id}`);
            redisClient.del(chat_id);
            redisClient.set(chat_id, 'init');
            return;
        }
        let nextElement = handler(message);
        if(!nextElement) return;
        redisClient.del(chat_id);
        redisClient.set(chat_id, nextElement);
    }

    setHandlers(handlers: ScenarioMap) {
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
