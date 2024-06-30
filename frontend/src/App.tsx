import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Search } from "./pages/Search";
import { Favorites } from "./pages/Favorites";
import background from "./assets/background.jpg";
import { NavbarButtons } from "./components/NavbarButtons";
import { useContext } from "react";
import { MapContext } from "./context/map";

export const App = () => {
	const mapContext = useContext<any>(MapContext);
	const { map } = mapContext;

	return (
		<div
			className={`bg-cover bg-no-repeat h-screen flex flex-col ${
				map ? "overflow-hidden" : "overflow-y-scroll"
			}  `}
			style={{ backgroundImage: `url(${background})` }}
		>
			<nav className="flex flex-row justify-end">
				<NavbarButtons content="Search" href="/search" />
				<NavbarButtons content="Favorites" href="/favorites" />
			</nav>

			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Navigate to="/search" replace />} />
						<Route path="search" element={<Search />} />
						<Route path="favorites" element={<Favorites />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
