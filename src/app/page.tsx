import { MediaZone } from "@/components/dropzone";

export default function Home() {
	return (
		<div className="flex flex-col gap-y-10 justify-center items-center w-[400px] md:w-[800px] py-5">
			<MediaZone />
		</div>
	);
}
