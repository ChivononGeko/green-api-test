const baseUrl = 'https://api.green-api.com'

function showResponse(data) {
	const field = document.getElementById('responseField')
	field.value = typeof data === 'string' ? data : JSON.stringify(data, null, 4)
}

function validate(fields) {
	for (let id of fields) {
		const element = document.getElementById(id)
		if (!element.value.trim()) {
			showResponse(
				`Error: The field "${element.placeholder || id}" is not filled in!`,
			)
			element.focus()
			return false
		}
	}
	return true
}

async function getSettings() {
	if (!validate(['idInstance', 'apiTokenInstance'])) return

	const id = document.getElementById('idInstance').value
	const token = document.getElementById('apiTokenInstance').value

	try {
		const response = await fetch(
			`${baseUrl}/waInstance${id}/getSettings/${token}`,
		)
		const data = await response.json()
		showResponse(data)
	} catch (error) {
		showResponse({ error: error.message })
	}
}

async function getStateInstance() {
	if (!validate(['idInstance', 'apiTokenInstance'])) return

	const id = document.getElementById('idInstance').value
	const token = document.getElementById('apiTokenInstance').value

	try {
		const response = await fetch(
			`${baseUrl}/waInstance${id}/getStateInstance/${token}`,
		)
		const data = await response.json()
		showResponse(data)
	} catch (error) {
		showResponse({ error: error.message })
	}
}

async function sendMessage() {
	if (
		!validate(['idInstance', 'apiTokenInstance', 'chatIdText', 'messageText'])
	)
		return

	const id = document.getElementById('idInstance').value
	const token = document.getElementById('apiTokenInstance').value
	const message = document.getElementById('messageText').value
	const chatId = document.getElementById('chatIdText').value + '@c.us'

	try {
		const response = await fetch(
			`${baseUrl}/waInstance${id}/sendMessage/${token}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ chatId, message }),
			},
		)
		const data = await response.json()
		showResponse(data)
	} catch (error) {
		showResponse({ error: error.message })
	}
}

async function sendFileByUrl() {
	if (!validate(['idInstance', 'apiTokenInstance', 'chatIdFile', 'fileUrl']))
		return

	const id = document.getElementById('idInstance').value
	const token = document.getElementById('apiTokenInstance').value
	const urlFile = document.getElementById('fileUrl').value
	const fileName = urlFile.split('/').pop() || 'file'
	const chatId = document.getElementById('chatIdFile').value + '@c.us'

	try {
		const response = await fetch(
			`${baseUrl}/waInstance${id}/sendFileByUrl/${token}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ chatId, urlFile, fileName }),
			},
		)
		const data = await response.json()
		showResponse(data)
	} catch (error) {
		showResponse({ error: error.message })
	}
}
