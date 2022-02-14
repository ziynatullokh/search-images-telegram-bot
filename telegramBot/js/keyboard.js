const like = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [ { text: '💔', callback_data: 'noLike' }, { text: '❤️', callback_data: 'like' } ]
      ]
    })
};

const home = {
    reply_markup: JSON.stringify({
        keyboard: [
            [{ text: 'Me 💔'}, {text: 'Me ❤️'}]
        ],
        resize_keyboard: true
    })
}

const contact = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [ { text: 'Dasturchi', url:`tg://user?id=${programmistContact}` } ]
      ]
    })
};