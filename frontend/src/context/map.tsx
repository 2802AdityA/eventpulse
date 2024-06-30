import { useState, createContext } from "react";

export const MapContext = createContext({});

export const MapProvider = ({ children }: any) => {
	const [map, setMap] = useState(false);
	const [center, setCenter] = useState({ lat: 0, lng: 0 });

	return (
		<MapContext.Provider
			value={{ map: map, setMap: setMap, center: center, setCenter: setCenter }}
		>
			{children}
		</MapContext.Provider>
	);
};
