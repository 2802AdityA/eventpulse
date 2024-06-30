export const NavbarButtons = (props: { content: string; href: string }) => {
	const pathname =
		window.location.pathname === "/" ? "/search" : window.location.pathname;

	return (
		<a className="text-white text-base font-semibold" href={props.href}>
			<button
				type="button"
				className={`rounded-xl p-2 m-8 text-white ${
					pathname === props.href ? "border-2 border-white rounded" : ""
				}`}
			>
				{props.content}
			</button>
		</a>
	);
};
