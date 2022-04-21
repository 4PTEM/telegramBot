export type InputMessage = {
    message_id: number,
    from: any,
    sender_chat?: any,
    date: number,
    chat: any,
    text: string,
    entities: any[],
    document: any,
    contact: any
}

export type OutputMessage = {
    chat_id: number,
    text: string,
    reply_markup?: InlineKeyboardMarkup
}

export type InlineKeyboardButton = {
    text: string,
    url?: string
}

export type InlineKeyboardMarkup = {
    keyboard: InlineKeyboardButton[][]
}

export type ScenarioMap = Map<string, ((message: InputMessage) => string | undefined)>;

export type User = {
    user_id: string,
    created_at: string,
    last_message: string
}

export type Category = {
    id: number,
    user_id: string,
    category_name: string,
    created_at: string
}

export type ExpenseRecord = {
    categorie_id: number,
    created_at: string,
    cost: number
}