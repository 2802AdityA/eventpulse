import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useContext } from "react";
import { MapContext } from "../context/map";


const containerStyle = {
	width: "600px",
	height: "600px",
};

export const PopupMap = () => {
	const mapContext = useContext<any>(MapContext);
	const center = mapContext.center;

	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: "YOUR_GOOGLE_API_KEY",
	});

	const onLoad = useCallback(function callback(map: any) {
		mapContext.setMap(map);
	}, []);

	const onUnmount = useCallback(function callback(map: any) {
		mapContext.setCenter({ lat: 0, lng: 0 });
		mapContext.setMap(null);
	}, []);

	return isLoaded ? (
		<div className="aboslute bg-white   rounded-lg border-4 border-gray-400">
			<div className="m-4">
				<h1 className="text-black font-semibold text-xl">Event Venue</h1>
			</div>
			<div className=" border-gray-300 border-2"></div>
			<div className="m-4 p-2">
				<div>
					<GoogleMap
						mapContainerStyle={containerStyle}
						center={center}
						zoom={17}
						onLoad={onLoad}
						onUnmount={onUnmount}
					>
						<Marker position={center} />
					</GoogleMap>
				</div>
				<div className="mt-4">
					<button
						className="bg-gray-900 text-white rounded-lg text-lg font-semibold p-2"
						onClick={onUnmount}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	) : (
		<></>
	);
};
