import { MediaZone } from "@/components/dropzone";

export default function Home() {
	return (
		<div className="flex flex-col gap-y-10 justify-center items-center w-[400px] md:w-[800px] py-5">
			<p className="font-normal text-2xl text-gray-700 text-center">
				<span className="text-black font-header-sans">
					<span className="font-tiny text-3xl">C</span>onvertor
				</span>{" "}
				is an online media converter. This support nearly all audio, video and
				image formats. To get started, use the button below and select files to
				convert from your computer or mobile.
			</p>
			<MediaZone />
		</div>
	);
}
