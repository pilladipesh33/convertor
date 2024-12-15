export type FileType = "image" | "video" | "invalid";

export type FileInfo = {
  id: string;
  name: string;
  type: FileType;
  size: string;
  progress: number;
};
