bot = new Bot(TOKEN)


bot.on('text', (msg) => {
	let chatId = msg.chat.id
	if(msg.text == '/start') {
		bot.sendMessage(chatId, `Xush kelibsiz ${msg.from.first_name}`, home)
		bot.sendMessage(chatId, "Botdan internet tarmog'idagi rasmlarni izlash va saqlash uchun foydalanish mumkin!")
		if(!users[chatId]){
			users[chatId]={'like':[],'noLike':[]}
			window.localStorage.setItem('users', JSON.stringify(users))
		}
	}
	
	else if(msg.text == 'Me ❤️'){
		if(users[chatId]['like'].length == 0){
			return bot.sendMessage(chatId,"Siz yoqtirgan rasmlar hali qo'shilmadi")
		}
		users[chatId]['like'].map( (el) => {
			bot.forwardMessage(chatId,el)
		} )
	}
	
	else if (msg.text == 'Me 💔'){
		if(users[chatId]['noLike'].length == 0){
			return bot.sendMessage(chatId,"Siz yoqtirmaydigon rasmni men ham yoqtirmayman")
		}
		users[chatId]['noLike'].map( (el) => {
			bot.forwardMessage(chatId,el)
		} )
	}
	else if(typeof msg.text === 'string' && !Number.isInteger(+msg.text)) {
		if(/^[a-zA-Z]\w+/.test(msg.text)){
			bot.sendPhoto(chatId, msg.text,like)
		}
		else{
			bot.sendMessage(chatId,"Hazillashvossimi")
		}
		
	}

	else{
		bot.sendMessage(chatId, "Men sizni tushunmadim, agar bu muammo bo'lsa murojaat qiling",contact)
	}

})

bot.on('callback_query', (msg) => {
	let chatId = msg.from.id
	let messageId = msg.message.message_id
	let status = msg['data']
	
	if(!users[chatId][status].includes(messageId)){
		users[chatId][status].push(messageId)
		return window.localStorage.setItem('users', JSON.stringify(users))
	}else{
		let index = users[chatId][status].indexOf(messageId)
		users[chatId][status].splice(index,1)
		return window.localStorage.setItem('users', JSON.stringify(users))
	}
	
})


bot.on('sticker', (msg) => {
	bot.sendMessage(msg.chat.id, "Qidirilayotgan rasm nomini yuboring")
})

bot.on('document', (msg) => {
	bot.sendMessage(msg.chat.id, "Qidirilayotgan rasm nomini yuboring")
})

bot.on('photo', (msg) => {
	bot.sendMessage(msg.chat.id, "Qidirilayotgan rasm nomini yuboring")
})

bot.on('location', (msg) => {
	// getAddress(msg.location.latitude,msg.location.longitude)
	bot.sendMessage(msg.chat.id, "403")
})

bot.on('dice', (msg) => {
	bot.sendMessage(msg.chat.id, `${msg.dice.value}`)
})


// async function getAddress (x,y){
// 	let res = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${x+''} ${y+''}&key=03c48dae07364cabb7f121d8c1519492&no_annotations=1&language=en`, {'mode': "no-cors"})
// 	res = await res.json()
// 	console.log(res)
// }
// bot.on('')
/*
	sendDocument
	sendPhoto
	sendSticker
	sendLocation
	sendDice
*/


bot.start()