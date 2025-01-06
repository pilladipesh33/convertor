"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { NAVBAR_CONTENT } from "@/utils/constant";
import { useRouter } from "next/navigation";

export const NavBottomBar = () => {
	const navigate = useRouter();

	const changeFirstCharColor = (text: string) => {
		if (text.length === 0) return null; // Return null for empty strings
		const firstChar = text.charAt(0);
		const restOfString = text.slice(1);
		return (
			<span>
				<span className="font-tiny">{firstChar}</span>
				{restOfString}
			</span>
		);
	};

	return (
		<div className="bg-white border border-neutral-200 px-8 py-6 rounded-full shadow-md">
			<div className="flex justify-center items-center gap-x-10">
				<TooltipProvider>
					{NAVBAR_CONTENT.map((item, index) => (
						<div key={index}>
							<Tooltip>
								<TooltipTrigger
									onClick={() => navigate.push(`${item.route}`)}
									className="font-medium font-space-grotesk"
								>
									{changeFirstCharColor(item.title)}
								</TooltipTrigger>
								<TooltipContent>
									<p>{item.hover}</p>
								</TooltipContent>
							</Tooltip>
						</div>
					))}
				</TooltipProvider>
			</div>
			<div></div>
		</div>
	);
};
