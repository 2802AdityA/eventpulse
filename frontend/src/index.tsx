import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { EventProvider } from "./context/events";
import { MapProvider } from "./context/map";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

root.render(
	<React.StrictMode>
		<EventProvider>
			<MapProvider>
				<App />
			</MapProvider>
		</EventProvider>
	</React.StrictMode>
);
