import { useContext, useEffect, useState } from "react";
import { EventContext } from "../../context/events";
import axios from "axios";
import { Event } from "./Event";

export const EventTable = () => {
	const eventContext = useContext<any>(EventContext);
	const [events, setEvents] = useState<any[]>([]);
	const [eventDetails, setEventDetails] = useState<any>(null);
	const [venueDetails, setVenueDetails] = useState<any>(null);

	useEffect(() => {
		setEvents(eventContext.events);
		sortEvents("Date/Time");
	}, [eventContext.events]);

	function handleBackButtonClick() {
		setEventDetails(null);
	}

	function sortEvents(property: string) {
		if (property == "Icon") return;
		const sortedEvents = [...eventContext.events].sort((a: any, b: any) => {
			if (a[property] < b[property]) {
				return -1;
			}
			if (a[property] > b[property]) {
				return 1;
			}
			return 0;
		});
		setEvents(sortedEvents);
	}

	async function getEventDetails(id: string) {
		await axios
			.get("http://127.0.0.1:8000/v1/eventDetails/", {
				params: {
					id: id,
				},
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
			})
			.then((response) => {
				setEventDetails(response.data.eventDetails);
				setVenueDetails(response.data.venueDetails);
			});
	}
	return eventDetails !== null ? (
		<Event
			eventDetails={eventDetails}
			venueDetails={venueDetails}
			onBackButtonClick={handleBackButtonClick}
		/>
	) : events.length !== 0 ? (
		<div className="w-1/2 my-20 ">
			<table>
				<thead>
					<tr className="bg-zinc-900">
						{Object.keys(events[0])
							.filter((heading) => heading !== "id")
							.map((heading) => (
								<th
									key={heading}
									scope="col"
									className=" text-center text-md font-semibold text-white"
								>
									<button
										onClick={() => {
											sortEvents(heading);
										}}
										className="my-2"
									>
										{heading}
									</button>
								</th>
							))}
					</tr>
				</thead>
				<tbody>
					{events.map((event: any) => (
						<tr
							key={event["id"]}
							onClick={(e) => {
								getEventDetails(event["id"]);
							}}
							className="even:bg-zinc-900 odd:bg-zinc-800 w-1/2 text-center"
						>
							<td className=" text-white w-1/6">
								<div className="flex flex-col align-middle">
									<p>{event["Date/Time"].split(" ")[0]}</p>
									<p>{event["Date/Time"].split(" ")[1]}</p>
								</div>
							</td>
							<td className="text-center py-4 px-3 w-1/6">
								<img className="inline" src={event["Icon"]} alt="image" />
							</td>
							<td className="text-lg p-4 w-1/3 text-white">{event["Event"]}</td>
							<td className="text-lg w-1/6 p-3 text-white">{event["Genre"]}</td>
							<td className="text-lg w-1/6 p-3 text-white">{event["Venue"]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	) : (
		<div className="w-1/2 bg-white text-center rounded-2xl my-20">
			<p className="text-red-600 font-extrabold">No results available</p>
		</div>
	);
};
