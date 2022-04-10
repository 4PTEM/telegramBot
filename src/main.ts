import express from 'express';
import { Processor } from './messageFunctions';
import { MessageListener } from './messageListener';
import * as constants from './constants';

const app = express();

app.use(express.json());

const processor = new Processor(constants.webhookToken);

const scenario = new Map([
    [0, processor.Answer(/\/start/, 'Привет ![button]')],
    [0, processor.Answer(/button/, 'Работает')]
]);

const messageListener = new MessageListener(constants.webhookToken);
messageListener.setHandlers(scenario);

app.post('/', (req, res) => {
    if(!req.body.message) return;
    const message = req.body.message;
    messageListener.handleMessage(message);
    res.send('ok');
});

app.listen(3000, () => console.log('HTTP started'));