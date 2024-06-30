import axios from "axios";

const GOOGLE_API_KEY = "YOUR_GOOGLE_API_KEY";
const IPINFO_API_KEY = "YOUR_IPINFO_API_KEY";

export const getLatLong = async (address: string, autodetect: boolean) => {
	if (autodetect) {
		const response = await axios.get("http://ipinfo.io/json", {
			params: {
				token: IPINFO_API_KEY,
			},
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		return response.data.loc.split(",");
	} else {
		const response = await axios.get(
			"https://maps.googleapis.com/maps/api/geocode/json",
			{
				params: {
					address: encodeURIComponent(address),
					key: GOOGLE_API_KEY,
				},
			}
		);
		const data = response.data.results[0];
		const geometry = data.geometry;
		const location = geometry.location;

		return [location.lat, location.lng];
	}
};
