export const Label = (props: {
	required?: boolean;
	for: string;
	children: React.ReactNode;
}) => {
	return (
		<label
			className="block text-lg my-3 font-medium text-blue-200"
			htmlFor={props.for}
		>
			{props.children}
			<span className="text-rose-600 text-lg">{props.required ? "*" : ""}</span>
		</label>
	);
};
