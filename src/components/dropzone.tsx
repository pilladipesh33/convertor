"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import ReactDropzone from "react-dropzone";
import {
  UploadCloud,
  FileSymlink,
  X,
  Check,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatFileSize } from "@/utils/file";
import fileToIcon from "@/utils/file-to-icon";
import compressFileName from "@/utils/compress-filenames";
import convertFile from "@/utils/media-convert";
import loadFfmpeg from "@/utils/load-ffmpeg";

import { Actions } from "@/types/action";
import { useToast } from "@/hooks/use-toast";

const extensions = {
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

export default function MediaZone() {
  const { toast } = useToast();
  const [isHover, setIsHover] = useState(false);
  const [actions, setActions] = useState<Actions[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [files, setFiles] = useState<Array<any>>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const ffmpegRef = useRef<any>(null);
  // const [selected, setSelected] = useState("...");

  const reset = () => {
    setIsDone(false);
    setActions([]);
    setFiles([]);
    setIsReady(false);
    setIsConverting(false);
  };

  const acceptedFiles = {
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

  useEffect(() => {
    const loadFFmpeg = async () => {
      const ffmpeg = await loadFfmpeg();
      ffmpegRef.current = ffmpeg;
      setIsLoaded(true);
    };
    loadFFmpeg();
  }, []);

  console.log("action", actions);

  // useEffect(() => {
  //   if (actions.length === 0) {
  //     reset();
  //   } else {
  //     checkIsReady();
  //   }
  // }, []);
  //
  const handleUpload = (data: Array<any>) => {
    resetHoverState();
    setFiles(data);
    const newActions = data.map((file) => ({
      file_name: file.name,
      file_size: file.size,
      from: file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2),
      to: null,
      file_type: file.type,
      file,
      is_converted: false,
      is_converting: false,
      is_error: false,
    }));
    setActions(newActions);
  };

  const convert = async () => {
    const updatedActions = actions.map((action) => ({
      ...action,
      is_converting: true,
    }));
    setActions(updatedActions);
    setIsConverting(true);

    for (const action of updatedActions) {
      try {
        const { url, output } = await convertFile(ffmpegRef.current, action);
        setActions((prevActions) =>
          prevActions.map((a) =>
            a === action
              ? { ...a, is_converted: true, is_converting: false, url, output }
              : a,
          ),
        );
      } catch (err: unknown) {
        setActions((prevActions) =>
          prevActions.map((a) =>
            a === action
              ? {
                  ...a,
                  is_converted: false,
                  is_converting: false,
                  is_error: true,
                }
              : a,
          ),
        );
      }
    }

    setIsDone(true);
    setIsConverting(false);
  };

  const download = (action: Actions) => {
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = action.url;
    a.download = action.output;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(action.url);
    document.body.removeChild(a);
  };

  const downloadAll = () => {
    actions.forEach((action) => {
      if (!action.is_error) download(action);
    });
  };

  const updateAction = useCallback((fileName: string, to: string) => {
    setActions((prevActions) => {
      const newActions = prevActions.map((action) =>
        action.file_name === fileName ? { ...action, to } : action,
      );
      const allReady = newActions.every((action) => action.to);
      setIsReady(allReady);
      return newActions;
    });
  }, []);

  const deleteAction = useCallback((action: Actions) => {
    setActions((prevActions) => prevActions.filter((a) => a !== action));
    setFiles((prevFiles) =>
      prevFiles.filter((f) => f.name !== action.file_name),
    );
  }, []);

  // const deleteAction = (action: Actions) => {
  //   setActions(actions.filter((a) => a !== action));
  //   setFiles(files.filter((f) => f.name !== action.file_name));
  // };
  //
  // const updateAction = (fileName: string, to: string) => {
  //   setActions(
  //     actions.map((action) =>
  //       action.file_name === fileName ? { ...action, to } : action,
  //     ),
  //   );
  // };

  const checkIsReady = () => {
    const allReady = actions.every((action) => action.to);
    setIsReady(allReady);
  };

  const handleHover = () => setIsHover(true);
  const resetHoverState = () => setIsHover(false);

  if (actions.length) {
    return (
      <div className="space-y-6">
        {actions.map((action, index) => (
          <div
            key={index}
            className="w-full py-4 space-y-2 lg:py-0 relative cursor-pointer rounded-xl border h-fit lg:h-20 px-4 lg:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between"
          >
            {!isLoaded && (
              <Skeleton className="h-full w-full -ml-10 cursor-progress absolute rounded-xl" />
            )}
            <div className="flex gap-4 items-center">
              <span className="text-2xl text-orange-600">
                {fileToIcon(action.file_type)}
              </span>
              <div className="flex items-center gap-1 w-96">
                <span className="text-md font-medium overflow-x-hidden">
                  {compressFileName(action.file_name)}
                </span>
                <span className="text-muted-foreground text-sm">
                  ({formatFileSize(action.file_size)})
                </span>
              </div>
            </div>
            {action.is_error ? (
              <Badge variant="destructive" className="flex gap-2">
                <span>Error Converting File</span>
                <AlertCircle />
              </Badge>
            ) : action.is_converted ? (
              <Badge variant="default" className="flex gap-2 bg-green-500">
                <span>Done</span>
                <Check />
              </Badge>
            ) : action.is_converting ? (
              <Badge variant="default" className="flex gap-2">
                <span>Converting</span>
                <span className="animate-spin">
                  <Loader2 />
                </span>
              </Badge>
            ) : (
              <div className="text-muted-foreground text-md flex items-center gap-4">
                <span>Convert to</span>
                <Select
                  value={action.to || "..."}
                  onValueChange={(value) => {
                    updateAction(action.file_name, value);
                  }}
                >
                  {/* <Select */}
                  {/*   value={selected} */}
                  {/*   onValueChange={(value) => { */}
                  {/*     setSelected(value); */}
                  {/*     updateAction(action.file_name, value); */}
                  {/*   }} */}
                  {/* > */}
                  <SelectTrigger className="w-32 outline-none focus:outline-none focus:ring-0 text-center text-muted-foreground bg-background text-md font-medium">
                    <SelectValue placeholder="..." />
                  </SelectTrigger>
                  <SelectContent className="h-fit">
                    {action.file_type.includes("image") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.image.map((ext, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={ext} className="mx-auto">
                              {ext}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                    {action.file_type.includes("video") && (
                      <Tabs defaultValue="video" className="w-full">
                        <TabsList className="w-full">
                          <TabsTrigger value="video" className="w-full">
                            Video
                          </TabsTrigger>
                          <TabsTrigger value="audio" className="w-full">
                            Audio
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="video">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.video.map((ext, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={ext} className="mx-auto">
                                  {ext}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                        <TabsContent value="audio">
                          <div className="grid grid-cols-3 gap-2 w-fit">
                            {extensions.audio.map((ext, i) => (
                              <div key={i} className="col-span-1 text-center">
                                <SelectItem value={ext} className="mx-auto">
                                  {ext}
                                </SelectItem>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    )}
                    {action.file_type.includes("audio") && (
                      <div className="grid grid-cols-2 gap-2 w-fit">
                        {extensions.audio.map((ext, i) => (
                          <div key={i} className="col-span-1 text-center">
                            <SelectItem value={ext} className="mx-auto">
                              {ext}
                            </SelectItem>
                          </div>
                        ))}
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
            )}
            {action.is_converted ? (
              <Button variant="outline" onClick={() => download(action)}>
                Download
              </Button>
            ) : (
              <span
                onClick={() => deleteAction(action)}
                className="cursor-pointer hover:bg-muted rounded-full h-10 w-10 flex items-center justify-center text-2xl text-foreground"
              >
                <X />
              </span>
            )}
          </div>
        ))}
        <div className="flex w-full justify-end">
          {isDone ? (
            <div className="space-y-4 w-fit">
              <Button
                className="rounded-xl font-semibold relative py-4 text-md flex gap-2 items-center w-full"
                onClick={downloadAll}
              >
                {actions.length > 1 ? "Download All" : "Download"}
                <Download />
              </Button>
              <Button onClick={reset} variant="outline" className="rounded-xl">
                Convert Another File(s)
              </Button>
            </div>
          ) : (
            <Button
              disabled={!isReady || isConverting}
              className="rounded-xl font-semibold relative py-4 text-md flex items-center w-44"
              onClick={convert}
            >
              {isConverting ? (
                <span className="animate-spin text-lg">
                  <Loader2 />
                </span>
              ) : (
                <span>Convert Now</span>
              )}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <ReactDropzone
      onDrop={handleUpload}
      onDragEnter={handleHover}
      onDragLeave={resetHoverState}
      accept={acceptedFiles}
      onDropRejected={() => {
        resetHoverState();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
      onError={() => {
        resetHoverState();
        toast({
          variant: "destructive",
          title: "Error uploading your file(s)",
          description: "Allowed Files: Audio, Video and Images.",
          duration: 5000,
        });
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="bg-background h-72 lg:h-80 xl:h-96 rounded-3xl shadow-sm border-secondary border-2 border-dashed cursor-pointer flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <div className="space-y-4 text-foreground">
            {isHover ? (
              <>
                <div className="justify-center flex text-6xl">
                  <FileSymlink />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Yes, right there
                </h3>
              </>
            ) : (
              <>
                <div className="justify-center flex text-6xl">
                  <UploadCloud />
                </div>
                <h3 className="text-center font-medium text-2xl">
                  Click, or drop your files here
                </h3>
              </>
            )}
          </div>
        </div>
      )}
    </ReactDropzone>
  );
}
