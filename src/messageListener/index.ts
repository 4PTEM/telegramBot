import { InputMessage, OutputMessage } from '../types';
import fetch from 'node-fetch';

export class MessageListener {
    webhookUrl: string;
    messageHandler: (message: InputMessage) => void = (message: InputMessage) => {};
    webhookToken: string;

    constructor(webhookUrl: string, webhookToken: string, ) {
        this.webhookUrl = webhookUrl;
        this.webhookToken = webhookToken;
        this.request('setWebhook', {url: 'https://chatbotsmcntelecom.com/'});
    }

    getMessageHandler() {
        return this.messageHandler;
    }

    setHandler(handler: (message:InputMessage) => void) {
        this.messageHandler = handler;
    }

    async request(command: string, body: any){
        let response = await (await fetch(`https://api.telegram.org/bot${this.webhookToken}/${command}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })).json();
        if(!response?.ok) console.log(response);
        return response;
    }

    sendMessage(message: OutputMessage){
        this.request('sendMessage', message);
    }
}
