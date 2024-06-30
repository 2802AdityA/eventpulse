import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell } from "../components/Favorite/TableCell";

const tableHeadings: string[] = [
	"#",
	"Date/Time",
	"Event",
	"Category",
	"Venue",
	"Favorite",
];

export const Favorites = () => {
	const [favorites, setFavorites] = useState<any>([]);

	useEffect(() => {
		const fav = JSON.parse(localStorage.getItem("favorites") || "[]");
		if (fav) {
			setFavorites(fav);
		}
	}, []);

	const removeFromFavorites = (fav: any) => {
		const newFavorites = favorites.filter(
			(favorite: any) => favorite.id !== fav.id
		);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
		setFavorites(newFavorites);
		alert("Removed from favorites");
	};

	return (
		<div className="h-screen">
			<div className="flex flex-row justify-center align-top">
				{favorites.length > 0 ? (
					<div className="flex flex-col justify-center">
						<div className="flex flex-row justify-center my-4">
							<h3 className="font-bold text-xl">
								List of your favorite events
							</h3>
						</div>
						<div className="flex flex-row justify-center">
							<table className="bg-white text-black divide-y p-8">
								<thead>
									<tr className="text-md">
										{tableHeadings.map((heading) => (
											<th key={heading} className="px-4 py-2">
												{heading}
											</th>
										))}
									</tr>
								</thead>
								<tbody className="divide-y p-8 ">
									{favorites.map((fav: any, index: number) => (
										<tr className="p-8 text-center" key={fav.id}>
											<TableCell content={`${index + 1}`} />
											<TableCell content={fav.date} />
											<TableCell content={fav.name} />
											<td className="m-4 p-2">
												{fav.genre.map((category: string, index: number) => (
													<span key={index}>
														{category}
														{index !== fav.genre.length - 1 && " | "}
													</span>
												))}
											</td>
											<TableCell content={fav.venue} />

											<td>
												<button onClick={() => removeFromFavorites(fav)}>
													<DeleteIcon fontSize="large" />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				) : (
					<div className="my-8 w-1/2 bg-white text-center rounded-2xl">
						<p className="text-red-600 font-extrabold">
							No favorite events to show
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
