import qs from "qs";

const clientId = "941433360379494185dbfadafd0a9781";
const clientSecret = "b07bddc3d41c47afa844b641dafdc9ba";

const redirect_uri = "http://localhost:3000";
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";


export async function authenticate() {
	let url = AUTHORIZE;
	url += "?client_id=" + clientId;
	url += "&response_type=code";
	url += "&redirect_uri=" + redirect_uri;
	url += "&scope=user-read-private user-read-email playlist-modify-public";

	const info = window.location.search;
	const params = new URLSearchParams(info);
	const myCode = params.get("code");

	furtherAuthenticate(myCode);
} 


async function furtherAuthenticate(code) {

	/*
	const data = qs.stringify({
		code: code,
		grant_type: "client_credentials",
		redirect_uri: redirect_uri
	})
	*/

	const data = JSON.stringify({
		code: code,
		grant_type: 'authorization_code',
		redirect_uri: redirect_uri
	})

	const response = await fetch(TOKEN, {
		method: 'POST',
		data,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
		}
	})
	const jsonResponse = await response.json();
	console.log(jsonResponse);
}









/*
		const response = await fetch(TOKEN, {
			method: "POST",
			body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			} 		
		 });

		const jsonResponse = await response.json();
		const accessToken = jsonResponse.access_token;

export async function get(endpoint) {

		const url = "https://api.spotify.com/v1/search?";
	    const searchQuery = `${url}q=${endpoint}&type=track&limit=10`;

		const data = await fetch(searchQuery, {
			headers: {
				"Authorization": `Bearer ${accessToken}`
			}
		});

		const tracksData = await data.json();

		return tracksData;				
}

*/











/*
function handleRedirect() {
	let code = getCode();
	fetchAccessToken(code);
}

function getCode() {
	let code = null;
	const querystring = window.location.search;
	if (querystring.length > 0) {
		const urlParams = new URLSearchParams(querystring);
		code = urlParams.get('code');
	}
	return code;
}

function requestAuthorization() {
	let url = AUTHORIZE;
	url += "?client_id=" + clientId;
	url += "&response_type=code";
	url += "&redirect_uri=" + encodeURI(redirect_uri);
	url += "&scope=playlist-modify-public";
	window.location.href = url;
}

function fetchAccessToken(code) {
	let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + clientId;
    body += "&client_secret=" + clientSecret;
    callAuthorizationApi(body);
}

async function callAuthorizationApi(body) {
	const response = await fetch(TOKEN, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Authorization": 'Basic ' + btoa(clientId + ":" + clientSecret)
		}
	})
	console.log(response);
}

handleRedirect();
requestAuthorization();
*/

/*
export async function createPlaylist(userId, name) {

	const url = `https://api.spotify.com/v1/users/${userId}/playlists`; 

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		},
		data: {
			name: JSON.stringify({name: name, public: true})						
		}
	})

	const data = await response.json();

	return data;
}
*/
