import { InputMessage, OutputMessage } from './types';

export class Processor {
    webhookToken: string;

    constructor(token: string) {
        this.webhookToken = token;
    }

    Answer(pattern: RegExp, answer: string, callback?: Function) {
        return (message: InputMessage) => {
            if (!pattern.test(message.text)) return;

            const outputMessage: OutputMessage = {
                chat_id: message.chat.id,
                text: answer
            }
            this.parseButtons(outputMessage);
            this.sendMessage(outputMessage);
            if (!callback) return;
            callback();
        }
    }

    parseButtons(message: OutputMessage): void {
        const text = message.text;
        const buttonsRegexp = /\!\[([^\]]*)\]/;
        if (!buttonsRegexp.test(text)) return;
        const inline_keyboard = [...text.matchAll(buttonsRegexp)].map(match => { return { text: match[1] }; });
        message.text = text.replace(buttonsRegexp, '');
        message.reply_markup = { inline_keyboard };
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