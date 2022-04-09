import { InputMessage } from './types';
import { MessageListener } from './messageListener';

export function Answer(pattern: RegExp, answer: string, messageListener: MessageListener, callback?: Function) {
    return function(message: InputMessage) {
        if(!pattern.test(message.text)) return;
        messageListener.sendMessage({
            chat_id: message.chat.id,
            text: answer
        });
        if(!callback) return;
        callback();
    }
}