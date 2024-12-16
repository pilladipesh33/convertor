import React from "react";
import { Image as ImageIcon, Video, X } from "lucide-react";
import { FileInfo } from "../types/file";
import { IMAGE_FORMAT } from "@/utils/format-constant";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FileListProps = {
	files: FileInfo[];
	onRemove: (id: string) => void;
};

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
	if (files.length === 0) return null;

	return (
		<div className="mt-6">
			<h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files</h3>
			<div className="space-y-3">
				{files.map((file) => (
					<div
						key={file.id}
						className="flex items-center justify-between p-4 bg-white rounded-lg gap-x-5"
					>
						<div className="flex items-center space-x-3 flex-1">
							{file.type === "image" ? (
								<ImageIcon className="w-6 h-6 text-blue-500" />
							) : (
								<Video className="w-6 h-6 text-purple-500" />
							)}
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-900">{file.name}</p>
								<p className="text-sm text-gray-500">
									{file.type} • {file.size}
								</p>
								{file.progress < 100 && (
									<div className="w-full mt-2 bg-gray-200 rounded-full h-1.5">
										<div
											className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
											style={{ width: `${file.progress}%` }}
										/>
									</div>
								)}
							</div>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<span>Open</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{IMAGE_FORMAT.map((format) => (
									<>
										<DropdownMenuItem>{format}</DropdownMenuItem>
									</>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
						<button
							onClick={() => onRemove(file.id)}
							className="p-1 hover:bg-gray-100 rounded ml-2"
						>
							<X className="w-5 h-5 text-gray-500" />
						</button>
					</div>
				))}
			</div>
		</div>
	);
};
