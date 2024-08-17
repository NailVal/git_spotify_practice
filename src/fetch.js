const clientId = "941433360379494185dbfadafd0a9781";
const clientSecret = "b07bddc3d41c47afa844b641dafdc9ba";


export async function get(endpoint) {

		const url = "https://api.spotify.com/v1/search?";
	    const searchQuery = `${url}q=${endpoint}&type=track&limit=10`;

		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			} 		
		});
		const jsonResponse = await response.json();
		const accessToken = jsonResponse.access_token;

		const data = await fetch(searchQuery, {
			headers: {
				"Authorization": `Bearer ${accessToken}`
			}
		});

		const tracksData = await data.json();

		return tracksData;				
}
