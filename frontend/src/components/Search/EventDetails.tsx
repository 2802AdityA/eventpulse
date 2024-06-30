import { DetailsHeadings } from "./DetailsHeadings";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

const status: { [key: string]: string[] } = {
	onsale: ["bg-green-500", "On Sale"],
	offsale: ["bg-red-500", "Off Sale"],
	postponed: ["bg-orange-500", "Postponed"],
	canceled: ["bg-black", "Canceled"],
	cancelled: ["bg-black", "Canceled"],
	rescheduled: ["bg-orange-500", "Rescheduled"],
};

export const EventDetails = ({ details: eventDetails }: any) => {
	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-evenly">
				<div className="flex flex-col w-1/2">
					<div className="flex flex-col text-center">
						{/* date */}
						{eventDetails.date && (
							<>
								<DetailsHeadings children="Date" />

								<span className="">{eventDetails.date}</span>
							</>
						)}
						{/* artist */}

						{eventDetails.artist.length >= 1 && (
							<>
								<DetailsHeadings children="Artist/Team" />

								<div>
									{eventDetails.artist.map((artist: any, index: number) => (
										<span key={artist.id}>
											<a className="text-blue-300 underline" href={artist.url}>
												{artist.name}
											</a>
											{index !== eventDetails.artist.length - 1 && " | "}{" "}
											<span></span>
										</span>
									))}
								</div>
							</>
						)}

						{/* venue */}
						{eventDetails.venue && (
							<>
								<DetailsHeadings children="Venue" />

								<span>{eventDetails.venue}</span>
							</>
						)}
						{/* genre */}
						{eventDetails.genre.length > 1 && (
							<>
								<DetailsHeadings children="Genre" />
								<div>
									{eventDetails.genre.map((genre: any, index: number) => (
										<span key={index}>
											{genre}
											{index !== eventDetails.genre.length - 1 && " | "}
										</span>
									))}
								</div>
							</>
						)}

						{/* price */}
						{eventDetails.minPrice && eventDetails.maxPrice && (
							<>
								<DetailsHeadings children="Price" />
								<span>
									{eventDetails.minPrice} - {eventDetails.maxPrice}{" "}
									{eventDetails.currency}
								</span>
							</>
						)}

						{/* ticket status */}
						{eventDetails.status && (
							<>
								<DetailsHeadings children="Ticket Status" />
								<div className="flex flex-row justify-center">
									<div
										className={`rounded-lg m-2 p-2  ${
											status[eventDetails.status][0]
										}`}
									>
										<span className="font-base">
											{status[eventDetails.status][1]}
										</span>
									</div>
								</div>
							</>
						)}

						{/* ticket link */}
						{eventDetails.url && (
							<>
								<DetailsHeadings children="Buy Ticket At:" />
								<span className="my-2">
									<a
										target="_blank"
										className="text-blue-300 underline"
										href={eventDetails.url}
									>
										TicketMaster
									</a>
								</span>
							</>
						)}
					</div>
				</div>
				{eventDetails.seatmap && (
					<div className="flex flex-col w-1/2">
						<div className="flex flex-row justify-end">
							<img className="" src={eventDetails.seatmap} alt="" />
						</div>
					</div>
				)}
			</div>
			<div className="flex justify-center">
				<div className="flex flex-row text-xl mt-8 mb-4 justify-center">
					<span className="mx-2 flex flex-col justify-center ">Share on: </span>
					<a
						className="mx-2"
						target="_blank"
						href={`https://twitter.com/intent/tweet?text=Check ${eventDetails.name} on Ticketmaster ${eventDetails.url}`}
					>
						<TwitterIcon fontSize="large" color="primary" />
					</a>
					<a
						className="mx-2"
						target="_blank"
						href={`https://www.facebook.com/sharer/sharer.php?u=${eventDetails.url}`}
					>
						<FacebookIcon fontSize="large" color="primary" />
					</a>
				</div>
			</div>
		</div>
	);
};
