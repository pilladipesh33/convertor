import Image from "next/image";
import progress from "../../../public/progress.svg";

const DocConverterPage = () => {
	return (
		<div className="flex flex-col justify-center items-center">
			<Image
				src={progress}
				alt="progress illustration"
				className="grayscale h-[25dvh] w-[25dvw]"
			/>
			<p className="font-normal text-md md:text-xl lg:text-3xl">
				Working on it! Thanks for your patience.
			</p>
		</div>
	);
};

export default DocConverterPage;
