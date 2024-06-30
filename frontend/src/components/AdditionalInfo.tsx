import { useState } from "react";

export const AdditionalInfo = ({ content }: any) => {
	const [showMore, setShowMore] = useState<boolean>(false);

	return (
		<>
			{content.length > 200 ? (
				<>
					<span className={`${showMore ? "" : "line-clamp-3"}`}>{content}</span>
					<span>
						<button
							onClick={() => setShowMore(!showMore)}
							className="text-blue-300"
						>
							{" "}
							<span className="underline">
								{showMore ? "Show Less" : "Show More"}{" "}
							</span>
							<span className="text-base">{showMore ? "▲" : "▼"}</span>
						</button>
					</span>
				</>
			) : (
				<span className="">{content}</span>
			)}
		</>
	);
};
