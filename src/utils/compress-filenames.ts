export default function compressFileName(fileName: string): string {
	const maxSubstrLength = 18;

	if (fileName.length <= maxSubstrLength) {
		return fileName.trim();
	}

	const [name, extension] = fileName.split(/(?=\.[^.]+$)/);

	const nameLength = maxSubstrLength - extension.length - 3; // 3 for '...'
	const keepStart = Math.ceil(nameLength / 2);
	const keepEnd = Math.floor(nameLength / 2);

	return `${name.slice(0, keepStart)}...${name.slice(-keepEnd)}${extension}`;
}
