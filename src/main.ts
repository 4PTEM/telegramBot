import express from 'express';
import { Processor } from './messageFunctions';
import { MessageListener } from './messageListener';
import * as constants from './constants';
import { ScenarioMap } from './types';

const app = express();

app.use(express.json());

const processor = new Processor(constants.webhookToken);

const scenario: ScenarioMap = new Map([
    ['init', processor.Answer(/\/start/, 'Привет ![button]', 'ask')],
    ['ask' , processor.Answer(/button/, 'Выбери ветку![branch1]![branch2]![branch3]', 'branch')],
    ['branch', processor.Branch(new Map([
        [/branch1/, {answer: 'welcome to branch1 ![imOn1]', nextElement: 'branch1'}],
        [/branch2/, {answer: 'welcome to branch2 ![imOn2]', nextElement: 'branch2'}],
        [/branch3/, {answer: 'welcome to branch3 ![imOn3]', nextElement: 'branch3'}]
    ]))]
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