
const apiHost = 'http://localhost:8000'

function fetchData(endpoint, object) {
	return fetch(apiHost + endpoint, {
		method: 'POST',
		body: JSON.stringify(object),
		headers: {
			'Content-Type': 'application/json'
		}
	}
}
