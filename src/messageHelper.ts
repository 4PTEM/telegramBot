import { InlineKeyboardButton, InlineKeyboardMarkup, InputMessage, OutputMessage } from './types';
import fetch from 'node-fetch';

export class Processor {
    webhookToken: string;

    constructor(token: string) {
        this.webhookToken = token;
    }

    Answer(pattern: RegExp, answer: string, nextElement: string, callback?: Function) {
        return (message: InputMessage) => {
            if (!pattern.test(message.text)) return;
            this.sendMessage({ chat_id: message.chat.id, text: answer });
            if (!callback) return nextElement;
            callback(message);
            return nextElement;
        }
    }

    Branch(branches: Map<RegExp, { answer: string, nextElement: string }>) {
        return (message: InputMessage) => {
            for (let regex of branches.keys()) {
                if (regex.test(message.text)) {
                    //@ts-ignore
                    let { answer, nextElement } = branches.get(regex);
                    this.sendMessage({ chat_id: message.chat.id, text: answer });
                    return nextElement;
                }
            }
        }
    }

    Loop(escapePatten: RegExp, action: (message: InputMessage) => string | undefined, nextElement: string) {
        return (message: InputMessage) => {
            if(escapePatten.test(message.text)) return nextElement;
            return action(message);
        }
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
        return response
    }
    sendMessage(message: OutputMessage) {
        message.text = message.text.trim().replace(/\s\s+/g, ' ')
        ButtonParser.parseButtons(message);
        this.request('sendMessage', message);
    }
}

class ButtonParser {

    static parseButtons(message: OutputMessage): void {
        const text = message.text;
        const buttonsRegexp = /\!\[([^\]]*)\]/g;
        if (!buttonsRegexp.test(text)) return;
        text.match(buttonsRegexp);
        const buttons = Array.from(text.matchAll(buttonsRegexp)).map(match => { return { text: match[1] } });
        let keyboard = this.putButtons(buttons);
        message.text = text.replace(buttonsRegexp, '');
        message.reply_markup = { keyboard };
    }

    static putButtons(buttons: InlineKeyboardButton[]): InlineKeyboardButton[][] {
        let keyboard: InlineKeyboardButton[][] = [];
        for (let row = 0; row < Math.ceil(buttons.length / 3); row++) {
            keyboard.push([]);
            for (let col = 0; col < 3; col++) {
                if (!buttons[(col) + (row * 3)]) break;
                keyboard[row].push(buttons[(col) + (row * 3)]);
            }
        }
        return keyboard;
    }
}