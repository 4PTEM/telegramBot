import express from 'express';
import { Answer } from './messageFunctions';
import { MessageListener } from './messageListener';

const app = express();

app.use(express.json());

const messageListener = new MessageListener('/', '5180125791:AAFUkwmILNwXlBhEuawYPQfEriYZAbNIxoc');
messageListener.setHandler(Answer(/\/start/, 'Hello', messageListener));

app.post('/', (req, res) => {
    if(!req.body.message) return;
    messageListener.getMessageHandler()(req.body.message);
    res.send('ok');
});

app.listen(3000, () => console.log('HTTP started'));