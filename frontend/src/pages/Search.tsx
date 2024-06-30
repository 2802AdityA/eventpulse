import { useContext } from "react";
import { Form } from "../components/Search/Form";
import { EventTable } from "../components/Search/EventTable";
import { PopupMap } from "../components/PopupMap";
import { MapContext } from "../context/map";

export const Search = () => {
	const mapContext = useContext<any>(MapContext);

	return (
		<div className="flex items-center flex-col  ">
			<Form />
			<div className="absolute z-10">{mapContext.map && <PopupMap />}</div>
			<EventTable />
		</div>
	);
};
