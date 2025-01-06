export const EXTENSIONS = {
	image: [
		"jpg",
		"jpeg",
		"png",
		"gif",
		"bmp",
		"webp",
		"ico",
		"tif",
		"tiff",
		"svg",
		"raw",
		"tga",
	],
	video: [
		"mp4",
		"m4v",
		"mp4v",
		"3gp",
		"3g2",
		"avi",
		"mov",
		"wmv",
		"mkv",
		"flv",
		"ogv",
		"webm",
		"h264",
		"264",
		"hevc",
		"265",
	],
	audio: ["mp3", "wav", "ogg", "aac", "wma", "flac", "m4a"],
};

export const ACCEPTED_FORMAT = {
	"image/*": [
		".jpg",
		".jpeg",
		".png",
		".gif",
		".bmp",
		".webp",
		".ico",
		".tif",
		".tiff",
		".raw",
		".tga",
	],
	"audio/*": [],
	"video/*": [],
};

export const NAVBAR_CONTENT = [
	{
		title: "Media",
		hover: "Convert the media files",
		route: "/",
	},
	{
		title: "Docs",
		hover: "Convert the doc files",
		route: "/doc-converter",
	},
	{
		title: "About",
		hover: "About this site",
		route: "/about",
	},
	{
		title: "Github",
		hover: "Give a star",
		route: "https://github.com/pilladipesh33/converter-site",
	},
];
