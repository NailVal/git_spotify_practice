const clientId = "941433360379494185dbfadafd0a9781";
const clientSecret = "b07bddc3d41c47afa844b641dafdc9ba";

const redirect_uri = "http://localhost:3000/callback";
const AUTHORIZE = "https://accounts.spotify.com/authorize";
const TOKEN = "https://accounts.spotify.com/api/token";

export function authorize() {
	let url = AUTHORIZE;
	url += "?client_id=" + clientId;
	url += "&response_type=code";
	url += "&redirect_uri=" + encodeURI(redirect_uri);
	url += "&scope=user-read-private user-read-email playlist-modify-public";

	window.location.href = url;
}

export function onPageLoad() {
	if (window.location.search.length > 0) {
		handleRedirect();
	}
}


function handleRedirect() {
	let code = getCode();
	fetchAccessToken(code);
	window.history.pushState("", "", redirect_uri);
}

function getCode() {
	const info = window.location.search;
	const params = new URLSearchParams(info);
	const myCode = params.get("code");
	return myCode;
}

function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code; 
    body += "&redirect_uri=" + encodeURI(redirect_uri);
    body += "&client_id=" + clientId;
    body += "&client_secret=" + clientSecret;
    getAccessKey(body);
}

async function getAccessKey(body) {
	const response = await fetch(TOKEN, {
		method: 'POST',
		body,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': 'Basic ' + btoa(clientId + ":" + clientSecret)
		}
	})

	if (!response.ok) {
		refreshAccessToken();
	}

	const jsonResponse = await response.json();

	handleResponse(jsonResponse);
}

function handleResponse(jsonResponse) {
	localStorage.setItem("access_token", jsonResponse.access_token);
	localStorage.setItem("refresh_token", jsonResponse.refresh_token);
}

function refreshAccessToken() {
	let refresh_token = localStorage.getItem("refresh_token");
	let body = "grant_type=refresh_token";
	body += "&refresh_token=" + refresh_token;
	body += "&client_id" + clientId;
	getAccessKey(body);
}

export async function get(endpoint) {

			const searchUrl = "https://api.spotify.com/v1/search?";
			const searchQuery = `${searchUrl}q=${endpoint}&type=track&limit=10`;
			const data = await fetch(searchQuery, {
				headers: {
					"Authorization": `Bearer ${localStorage.getItem("access_token")}`
				}
			});
			const tracksData = await data.json();
			return tracksData;	
		}					

/*
export async function createPlaylist(userId, name) {

	const accessToken = await furtherAuthenticate();

	const url = `https://api.spotify.com/v1/users/${userId}/playlists`; 

	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${accessToken}`,
			"Content-Type": "application/json"
		},
		data: {
		//	name: JSON.stringify({name: name, public: true})
			name: name,
			public: true						
		}
	})

	const data = await response.json();

	return data;
}
*/

