import { useContext } from "react";
import { DetailsHeadings } from "./DetailsHeadings";
import { MapContext } from "../../context/map";
import { AdditionalInfo } from "../AdditionalInfo";

export const VenueDetails = ({ details: venueDetails }: any) => {
	const mapContext = useContext<any>(MapContext);

	function setMapDetails() {
		mapContext.setCenter({
			lat: parseFloat(venueDetails.lat),
			lng: parseFloat(venueDetails.long),
		});
		mapContext.setMap(true);
	}

	return (
		<div className="flex flex-col">
			<div className="flex flex-row justify-evenly gap-8">
				<div className="flex flex-col w-1/2">
					<div className="flex flex-col text-center">
						{/* name */}
						{venueDetails.name && (
							<>
								<DetailsHeadings children="Name" />

								<span className="">{venueDetails.name}</span>
							</>
						)}
						{/* address */}

						{venueDetails.address && (
							<>
								<DetailsHeadings children="Address" />
								<span className="">{venueDetails.address}</span>
							</>
						)}

						{/* Phone Number */}
						{venueDetails.phoneNumber && (
							<>
								<DetailsHeadings children="Phone Number" />

								<span>{venueDetails.phoneNumber}</span>
							</>
						)}
					</div>
				</div>

				{venueDetails.openHours &&
					venueDetails.generalRule &&
					venueDetails.childRule && (
						<div className="flex flex-col w-1/2">
							<div className="flex flex-col text-center">
								{/* Open hours */}
								{venueDetails.openHours && (
									<>
										<DetailsHeadings children="Open Hours" />

										<AdditionalInfo content={venueDetails.openHours} />
									</>
								)}
								{/* genral rule */}

								{venueDetails.generalRule && (
									<>
										<DetailsHeadings children="General Rule" />

										<AdditionalInfo content={venueDetails.generalRule} />
									</>
								)}

								{/* Child Rule */}
								{venueDetails.childRule && (
									<>
										<DetailsHeadings children="Child Rule" />

										<AdditionalInfo content={venueDetails.childRule} />
									</>
								)}
							</div>
						</div>
					)}
			</div>

			{venueDetails.lat !== "" && venueDetails.long !== "" && (
				<div className="flex flex-row text-2xl mt-8 mb-4 justify-center">
					<button
						onClick={setMapDetails}
						className="bg-red-600 text-white p-2 rounded-lg text-lg"
					>
						Show venue on Google map
					</button>
				</div>
			)}
		</div>
	);
};
