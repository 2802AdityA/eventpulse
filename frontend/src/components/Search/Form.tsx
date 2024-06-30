import { Label } from "../Label";
import { useState, useContext, useEffect, useRef } from "react";
import { getLatLong } from "../../service/location";
import axios from "axios";
import { EventContext } from "../../context/events";
import Geohash from "latlon-geohash";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ts from "typescript";

const categoryMap = {
	default: "",
	music: "KZFzniwnSyZfZ7v7nJ",
	sports: "KZFzniwnSyZfZ7v7nE",
	artsTheatre: "KZFzniwnSyZfZ7v7na",
	film: "KZFzniwnSyZfZ7v7nn",
	miscellaneous: "KZFzniwnSyZfZ7v7n1",
};

export const Form = () => {
	const eventContext = useContext<any>(EventContext);

	const [keyword, setKeyword] = useState("");
	const [distance, setDistance] = useState("10");
	const [category, setCategory] = useState("default");
	const [location, setLocation] = useState("");
	const [autoDetect, setAutoDetect] = useState(false);
	const [suggestions, setSuggestions] = useState([]);

	async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		var geoPoint: string;

		await getLatLong(location, autoDetect)
			.then((data) => {
				geoPoint = Geohash.encode(data[0], data[1], 7);
			})
			.then(async () => {
				await axios
					.get("http://127.0.0.1:8000/v1/searchEvents/", {
						params: {
							keyword: keyword,
							radius: distance === "" ? "10" : distance,
							unit: "miles",
							segmentId: categoryMap[category as keyof typeof categoryMap],
							geoPoint: geoPoint,
						},
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
						},
					})
					.then((response) => {
						if (response.status !== 404) {
							(eventContext as any).setEvents(response.data);
						}
					})
					.catch((error) => {
						(eventContext as any).setEvents([]);
					});
			});
	}

	function clearForm(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setKeyword("");
		setDistance("10");
		setCategory("default");
		setAutoDetect(false);
		setLocation("");
		eventContext.setEvents([]);
	}

	async function getSuggestions() {
		if (keyword)
			await axios
				.get("http://127.0.0.1:8000/v1/keywordSuggestions/", {
					params: {
						keyword: keyword,
					},
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
					},
				})
				.then((response) => {
					setSuggestions(response.data);
				});
	}

	type Timer = ReturnType<typeof setTimeout>;

	function useDebounce(fn: any, delay: number) {
		const timer = useRef<Timer>();

		return (() => {
			const newTimer = setTimeout(() => {
				fn();
			}, delay);
			clearTimeout(timer.current);
			timer.current = newTimer;

		});
	}


	const processChange = useDebounce(getSuggestions, 1000);


	return (
		<div className="backdrop-blur-sm p-10 rounded-2xl w-1/3 bg-zinc-700/[.5]">
			<h2 className="text-center text-4xl mb-4 mt-6 font-serif">
				Events Search
			</h2>
			<hr />
			<form onSubmit={formSubmit} action="">
				<Label required for="keyword">
					Keyword
				</Label>
				<Autocomplete
					freeSolo={true}
					onInputChange={(event, newInputValue) => {
						setKeyword(newInputValue);
					}}
					fullWidth={true}
					value={keyword}
					id="combo-box-demo"
					options={[keyword, ...suggestions]}
					renderInput={(params) => (
						<div>
							<TextField
								value={keyword}
								onKeyUp={processChange}
								onChange={(e) => {
									setKeyword(e.target.value);
								}}
								{...params}
								color="primary"
								type="text"
								className="w-full bg-white rounded-lg text-black p-2 my-2"
								id="keyword"
								name="keyword"
							/>
						</div>
					)}
				/>
				<br />
				<div className="flex flex-row gap-4 justify-between">
					<div className="w-1/2">
						<Label for="distance">Distance (miles)</Label>

						<input
							min="0"
							value={distance}
							onChange={(e) => setDistance(e.target.value)}
							className="w-full rounded-lg text-black p-2 my-2"
							type="number"
							id="distance"
							name="distance"
						/>
					</div>
					<div className="w-1/2">
						<Label required for="category">
							Category
						</Label>

						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							required
							className="text-black w-full rounded-lg p-2 my-2"
							name="category"
							id="category"
						>
							<option value="default">Default</option>
							<option value="music">Music</option>
							<option value="sports">Sports</option>
							<option value="artsTheatre">Arts & Theatre</option>
							<option value="film">Film</option>
							<option value="miscellaneous">Miscellaneous</option>
						</select>
					</div>
				</div>
				<Label required for="location">
					Location
				</Label>
				<input
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					required
					disabled={autoDetect}
					className="text-black w-full rounded-lg p-2 my-2"
					type="text"
					id="location"
					name="location"
				/>
				<br />
				<div className="flex flex-row align-bottom mt-3">
					<input
						checked={autoDetect ? true : false}
						onChange={(e) => {
							setAutoDetect(!autoDetect);
							setLocation("");
						}}
						className="mr-3 align-middle justify-center"
						type="checkbox"
						id="useMyLocation"
						name="useMyLocation"
					/>
					<label htmlFor="useMyLocation">Auto-detect your location</label>
				</div>

				<br />
				<div className="flex flex-row justify-center ">
					<button
						className="bg-red-500 text-lg p-3 m-5 rounded-lg"
						type="submit"
					>
						SUBMIT
					</button>
					<button
						onClick={clearForm}
						className="bg-blue-500 text-lg p-3 m-5 rounded-lg"
					>
						CLEAR
					</button>
				</div>
			</form>
		</div>
	);
};
