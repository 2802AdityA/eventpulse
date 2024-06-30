import React from "react";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { EventDetails } from "./EventDetails";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import { VenueDetails } from "./VenueDetails";
import Avatar from "@mui/material/Avatar";
import { amber } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

export const Event = ({
	eventDetails,
	venueDetails,
	onBackButtonClick,
}: any) => {
	const [favorites, setFavorites] = useState<any>([]);

	const [eventFavorite, setEventFavorite] = useState(false);

	const [tabValue, setTabValue] = useState(0);

	const changeTabValue = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	function updateFavorites(update: boolean) {
		if (update) {
			if (!checkFavorites()) {
				localStorage.setItem(
					"favorites",
					JSON.stringify([...favorites, eventDetails])
				);
				setFavorites([...favorites, eventDetails]);
				alert("Event added to favorites!");
			}
		} else {
			setFavorites(favorites.filter((fav: any) => fav.id !== eventDetails.id));
			alert("Removed from favorites");
		}
	}

	useEffect(() => {
		const favorites = localStorage.getItem("favorites");
		const fav = JSON.parse(favorites || "[]");
		setFavorites(fav);
		if (fav) {
			fav.map((fav: any) => {
				if (fav.id === eventDetails.id) {
					setEventFavorite(true);
				}
			});
		}
	}, []);

	function checkFavorites() {
		const favorites = localStorage.getItem("favorites");
		const fav = JSON.parse(favorites || "[]");
		fav.map((fav: any) => {
			if (fav.id === eventDetails.id) {
				return true;
			}
		});
		return false;
	}

	return (
		<div className="w-1/2 my-20 backdrop-blur-sm bg-zinc-700/[.5]">
			<div className="flex justify-start">
				<button
					className="text-white text-xl font-semibold m-8"
					onClick={() => {
						onBackButtonClick();
						setTabValue(0);
					}}
				>
					{"< "} <span className="underline">Back</span>
				</button>
			</div>
			<div className="flex flex-row justify-center gap-4 mt-4 mb-8 p-2">
				<div className="text-2xl font-bold flex flex-col justify-center">
					<h3>{eventDetails.name}</h3>
				</div>
				<div>
					<button
						onClick={() => {
							updateFavorites(!eventFavorite);

							setEventFavorite(!eventFavorite);
						}}
					>
						<Avatar sx={{ bgcolor: amber[50] }}>
							{eventFavorite ? (
								<FavoriteIcon fontSize="large" className="text-red-600" />
							) : (
								<FavoriteBorderRoundedIcon
									fontSize="large"
									className="text-red-600"
								/>
							)}
						</Avatar>
					</button>
				</div>
			</div>

			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<div className="bg-[#479485]">
						<Tabs
							value={tabValue}
							onChange={changeTabValue}
							aria-label="basic tabs example"
							centered
							textColor="inherit"
						>
							<Tab label="Events" {...a11yProps(0)} />
							<Tab label="Venue" {...a11yProps(1)} />
						</Tabs>
					</div>
				</Box>
				<TabPanel value={tabValue} index={0}>
					<EventDetails details={eventDetails} />
				</TabPanel>
				<TabPanel value={tabValue} index={1}>
					<VenueDetails details={venueDetails} />
				</TabPanel>
			</Box>
		</div>
	);
};

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}
