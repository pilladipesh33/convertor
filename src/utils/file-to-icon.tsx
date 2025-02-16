import { ImageIcon, FileText, Video, FileAudio, File } from "lucide-react";
import { JSX } from "react";

// type FileType = "video" | "audio" | "text" | "image";
type fileTypeProps = string;

export default function fileToIcon(fileType: fileTypeProps): JSX.Element {
  if (fileType.includes("video")) return <Video />;
  if (fileType.includes("audio")) return <FileAudio />;
  if (fileType.includes("text")) return <FileText />;
  if (fileType.includes("image")) return <ImageIcon />;
  return <File />;
}
