import React from "react";
import { Upload } from "lucide-react";
import { ACCEPTED_FORMAT } from "@/utils/constant";

type FileUploadZoneProps = {
  isDragging: boolean;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  isDragging,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileSelect,
}) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <Upload className="w-12 h-12 mx-auto text-gray-400" />
      <h2 className="mt-4 text-xl font-medium text-gray-700">
        Drop your files here
      </h2>
      <p className="mt-2 text-gray-500">or</p>
      <label className="mt-4 inline-block">
        <input
          type="file"
          className="hidden"
          accept={ACCEPTED_FORMAT}
          multiple
          onChange={onFileSelect}
        />
        <span className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 cursor-pointer">
          Select Files
        </span>
      </label>
      <p className="mt-2 text-sm text-gray-500">
        Supported formats: Images and Videos
      </p>
    </div>
  );
};
