const AboutPage = () => {
	return (
		<div className="flex flex-col gap-4  w-[400px] md:w-[800px] py-10 text-xl  font-normal ">
			<h1 className="text-3xl font-semibold font-header-sans">
				<span className="font-tiny text-4xl">A</span>bout
			</h1>
			<p className="">
				Welcome to our media conversion platform! Our platform allows you to
				easily convert your media files (audio, video, and images) into various
				formats with just a few clicks.
			</p>

			<div className="pt-5" />
			<h2>Key Features:</h2>
			<ul>
				<li>
					Drag and Drop Upload: Simply drag and drop your files into the upload
					area or click to select files.
				</li>
				<li>
					Format Conversion: Convert your media files to a variety of formats,
					including popular video, audio, and image formats.
				</li>
				<li>
					File Management: Easily manage your uploaded files, track the
					conversion status, and download the converted files.
				</li>
				<li>
					Real-time Status Updates: Get real-time updates on the conversion
					progress and status of your files.
				</li>
			</ul>

			<div className="pt-5" />
			<h2>How It Works:</h2>
			<ul>
				<li>
					Upload Your Files: Drag and drop your media files into the designated
					area or click to upload.
				</li>
				<li>
					Select Conversion Format: Choose the desired format for each file from
					the available options.
				</li>
				<li>
					Convert: Click the &quot;Convert Now&quot; button to start the
					conversion process.
				</li>
				<li>
					Download: Once the conversion is complete, download your converted
					files.
				</li>
			</ul>

			<p className="pt-5">
				For more details on the implementation and to contribute to our project,
				please visit our GitHub repository.
			</p>
			<p>Thank you for using our platform!</p>
		</div>
	);
};

export default AboutPage;
