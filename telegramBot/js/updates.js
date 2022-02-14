// async function getUpdates () {
// 	let message = window.localStorage.getItem('message')
// 	message = message ? JSON.parse(message) : undefined

// 	let response = await fetch(`https://api.telegram.org/bot${TOKEN}/getUpdates?offset=` + message?.update_id)
// 	let { result } = await response.json()

// 	let newMessage = result.at(-1)

// 	if(message && message.update_id < result.at(-1).update_id) {
// 		window.localStorage.setItem('message', JSON.stringify(newMessage))
// 		return newMessage
// 	} else if (!message) {
// 		window.localStorage.setItem('message', JSON.stringify(newMessage))
// 		return newMessage
// 	}
// }

async function getUpdates () {
	if(!this.getUpdates.messages) this.getUpdates.messages = []

	const messages = this.getUpdates.messages
	const lastSavedUpdateId = messages.at(-1)?.update_id

	let response = await fetch(URL + `/getUpdates?offset=` + lastSavedUpdateId)
	response = await response.json()

	const result = response.ok ? response.result : []

	if(messages.at(-1)?.update_id <= result.at(1)?.update_id) {
		result.shift()
		this.getUpdates.messages = result
		return result
	} else if(!messages.length && result.length) {
		this.getUpdates.messages = result
	}

	return
}
