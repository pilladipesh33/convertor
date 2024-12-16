import { FileType } from "../types/file";

export const isValidFileType = (file: File): FileType => {
	const formatName = file.type.split("/")[1] as FileType; // Cast to FileType
	return formatName;
};

export const formatFileSize = (bytes: number): string => {
	if (bytes === 0) return "0 Bytes";
	const k = 1024;
	const sizes = ["Bytes", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
