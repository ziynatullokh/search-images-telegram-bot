class Bot {

	constructor(TOKEN) {
		this.TOKEN = TOKEN;
		this.URL = `https://api.telegram.org/bot${TOKEN}/`
		this.messageTypes = {}
	}

	start () {
		setInterval(async () => {
			const messages = await getUpdates()
			if(!(messages && messages.length)) return
			
			for(let message of messages) {
				if(message.callback_query && this.messageTypes.callback_query) {
					return this.messageTypes['callback_query'](message.callback_query)
				} 
				else if(message.message.text && this.messageTypes.text) {
					return this.messageTypes['text'](message.message)
				} 
				else if(message.message.voice && this.messageTypes.voice) {
					return this.messageTypes['voice'](message.message)
				} 
				else if(message.message.document && this.messageTypes.document) {
					return this.messageTypes['document'](message.message)
				} 
				else if(message.message.photo && this.messageTypes.photo) {
					return this.messageTypes['photo'](message.message)
				} 
				else if(message.message.video && this.messageTypes.video) {
					return this.messageTypes['video'](message.message)
				}
			}
			
		}, 500)
	}

	on(message, callback) {
		this.messageTypes[message] = callback
	}

	async sendMessage (chatId, text, params) {
		let response = await fetch(this.URL + 'sendMessage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: chatId,
				text,
				...params
			})
		})
		return response
	}

	async sendPhoto (chatId,text, params){
		let response = await fetch(`https://pixabay.com/api/?key=25570361-2831118e9efb3556d0258fa4f&q=${text}&image_type=photo`)

		response = await response.json()
		let random = Math.round(Math.random()*response.hits.length)
		if(!random){
			return this.sendMessage(chatId, "Rasm topilmadi")
		}

		let url = response.hits[random-1].webformatURL
		let caption = text
		let res = await fetch(this.URL + 'sendPhoto', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id: chatId,
				photo: url,
				caption,
				...params
			})
		})
		return res
	}

	async forwardMessage (chatId,message_id,params){
		let response = await fetch(this.URL + 'forwardMessage', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				chat_id : chatId,
				from_chat_id : chatId,
				message_id,
				...params
			})
		})
		return response

	}
	async sendAllUsers(){
		let user = Object.keys(users)
		let text = document.querySelector('.mailing-text')
		text = text.value.trim()
		if(text == ''){
			return alert('Biror narsa yozing')
		}
		for(let id of user){
			this.sendMessage(id,text)
		}
		return true
	}
}