import express from 'express';
import { Processor } from './messageHelper';
import { MessageListener } from './messageListener';
import * as constants from './constants';
import { ScenarioMap } from './types';

const app = express();

app.use(express.json());

const processor = new Processor(constants.webhookToken);

const scenario: ScenarioMap = new Map([
    ['init', processor.Answer(/\/start/,
        `Привет, я бот Dreamoney!
        Я создан для того, чтобы конралировать доходы и расходы,
        а также добиваться целей. ![Что ты умеешь?]`, 'what can you do')],
    ['what can you do', processor.Answer(/Что ты умеешь\?/,
        `Я создать категории трат или 
        помочь тебе и предложить стандартные. 
        Их всегда можно будет изменить в настройках.
        Также я могу добавить “цели”.
        Цели - это те вещи, на которые ты сейчас копишь. 
        (ем ещё цели от категорий отличаются?) ![Понятно]`, 'ok')],
    ['ok', processor.Answer(/Понятно/, `
        Давай начнём. Выбери любой сценарий
        ![Создать свои категории] ![Создать стандартные категории] ![Создать цели]
    `, 'scenarios')],
    ['scenarios', processor.Branch(new Map([
        [/Создать свои категории/, { answer: 
        `Напиши название первой категории

        В названии не должно быть более 35 символов

        Пример сообщения:
        Продукты`    
        , nextElement: 'custom categories' }],
        [/Создать стандартные категории/, { answer: 'welcome to branch2 ![imOn2]', nextElement: 'standart categories' }],
        [/Создать цели/, { answer: 'welcome to branch3 ![imOn3]', nextElement: 'create goals' }]
    ]))],
    ['custom categories', processor.Loop(/Закончить ввод/, processor.Answer(/^.{4,35}$/, 'Введите еще одну категорию![Закончить ввод]', 'custom categories'), 'ok')]
]);

const messageListener = new MessageListener(constants.webhookToken);
messageListener.setHandlers(scenario);

app.post('/', (req, res) => {
    if (!req.body.message) return;
    const message = req.body.message;
    messageListener.handleMessage(message);
    res.send('ok');
});

app.listen(3000, () => console.log('HTTP started'));