"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileAudio, FileVideo, CheckCircle2, X, Loader2, AlertCircle, Info, Play } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type FileStatus = "idle" | "uploading" | "processing" | "complete" | "error";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: FileStatus;
  error?: string;
  duration?: number;
  transcription?: string;
  createdAt: Date;
}

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    
    const newFiles: UploadedFile[] = Array.from(selectedFiles)
      .filter(file => file.type.includes('audio') || file.type.includes('video'))
      .map(file => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: "idle",
        createdAt: new Date()
      }));
    
    if (newFiles.length === 0) {
      toast.error("Please select audio or video files only");
      return;
    }
    
    setFiles(prev => [...newFiles, ...prev]);
    
    // Simulate the upload process for each file
    newFiles.forEach(simulateFileUpload);
  };

  const simulateFileUpload = (file: UploadedFile) => {
    // Update file status to uploading
    updateFileStatus(file.id, "uploading", 0);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        updateFileStatus(file.id, "processing", 100);
        
        // Simulate processing time (3-5 seconds)
        setTimeout(() => {
          const success = Math.random() > 0.1; // 90% success rate for demo
          
          if (success) {
            updateFileStatus(file.id, "complete", 100, {
              duration: Math.floor(Math.random() * 300) + 30, // Random duration between 30-330 seconds
              transcription: "This is a simulated transcription for demonstration purposes. In a real application, this would contain the actual transcribed text from the audio or video file."
            });
            toast.success(`Transcription complete for ${file.name}`);
          } else {
            updateFileStatus(file.id, "error", 100, { 
              error: "Failed to process file. Please try again."
            });
            toast.error(`Failed to transcribe ${file.name}`);
          }
        }, Math.random() * 2000 + 3000);
      } else {
        updateFileStatus(file.id, "uploading", progress);
      }
    }, 300);
  };

  const updateFileStatus = (
    id: string, 
    status: FileStatus, 
    progress: number, 
    extras?: { error?: string, duration?: number, transcription?: string }
  ) => {
    setFiles(prev => 
      prev.map(file => 
        file.id === id 
          ? { ...file, status, progress, ...(extras || {}) } 
          : file
      )
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const formatDuration = (seconds?: number): string => {
    if (!seconds) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes('audio')) {
      return <FileAudio className="w-6 h-6 text-blue-500" />;
    } else if (type.includes('video')) {
      return <FileVideo className="w-6 h-6 text-purple-500" />;
    }
    return <FileAudio className="w-6 h-6 text-muted-foreground" />;
  };

  return (
    <div className="container px-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload Media</h1>
          <p className="text-muted-foreground mt-1">
            Upload audio or video files for AI transcription
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="upload" className="relative overflow-hidden group">
              Upload
              <AnimatePresence>
                {activeTab === "upload" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    layoutId="activeTabIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </TabsTrigger>
            <TabsTrigger value="history" className="relative overflow-hidden group">
              History
              <AnimatePresence>
                {activeTab === "history" && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                    layoutId="activeTabIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </AnimatePresence>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="upload" className="mt-0 space-y-6">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background/20 backdrop-blur-sm" />
              <div className="absolute -top-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-primary/5 blur-[100px]" />
              <div className="absolute -bottom-[30%] -left-[20%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[100px]" />
              <svg 
                className="absolute right-0 bottom-0 text-primary/5 w-72 h-72 opacity-30"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M47.7,-57.2C59,-47.3,63.6,-30.7,69.3,-12.8C75,5.1,81.7,24.4,75.4,35.9C69.1,47.4,49.8,51.2,32.8,55.9C15.8,60.7,1.1,66.3,-14.9,65.6C-30.9,64.8,-48.2,57.6,-59.8,44.7C-71.5,31.8,-77.5,13.2,-76.8,-5.2C-76.2,-23.5,-69,-41.7,-56.4,-51.5C-43.9,-61.3,-26,-62.7,-9.2,-56.9C7.7,-51.1,36.3,-67.1,47.7,-57.2Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            <CardHeader>
              <CardTitle className="text-2xl">Upload Files</CardTitle>
              <CardDescription>
                Drag and drop your audio or video files, or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={cn(
                  "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 relative overflow-hidden",
                  isDragging 
                    ? "border-primary bg-primary/5 scale-[0.99]"
                    : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20"
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={openFileDialog}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,video/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  multiple
                />
                <div className="mx-auto flex flex-col items-center justify-center gap-3">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-lg font-semibold mt-2">
                      {isDragging ? "Drop files here" : "Drop files here or click to browse"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
                      Supported formats: MP3, WAV, MP4, MOV, and more
                    </p>
                    <p className="text-xs text-muted-foreground/60 mt-3 mb-2">
                      Maximum file size: 500 MB
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Browse Files
                    </Button>
                  </motion.div>
                </div>

                {/* Decorative audio waves SVG */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-30">
                  <svg width="200" height="40" viewBox="0 0 200 40" className="text-primary">
                    {[...Array(20)].map((_, i) => {
                      const height = Math.sin((i / 20) * Math.PI) * 30 + 10;
                      return (
                        <motion.rect
                          key={i}
                          x={i * 10 + 5}
                          y={(40 - height) / 2}
                          width="3"
                          height={height}
                          rx="1"
                          fill="currentColor"
                          initial={{ scaleY: 0.3, opacity: 0.3 }}
                          animate={{
                            scaleY: [0.3, 1, 0.3],
                            opacity: [0.3, 1, 0.3]
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: i * 0.1 % 1
                          }}
                        />
                      );
                    })}
                  </svg>
                </div>
              </div>

              {files.length > 0 && (
                <div className="mt-8">
                  <h3 className="font-medium mb-4">Uploads ({files.length})</h3>
                  <div className="space-y-4">
                    <AnimatePresence>
                      {files.map(file => (
                        <motion.div 
                          key={file.id}
                          className="relative bg-background/40 backdrop-blur-sm border rounded-lg p-4 overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getFileIcon(file.type)}
                              <div className="space-y-1">
                                <h4 className="font-medium text-sm line-clamp-1">
                                  {file.name}
                                </h4>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>{formatFileSize(file.size)}</span>
                                  {file.duration && (
                                    <>
                                      <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                                      <span className="flex items-center gap-1">
                                        {formatDuration(file.duration)}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {file.status === "complete" && (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              )}
                              {file.status === "error" && (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                              )}
                              {file.status === "processing" && (
                                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                              )}
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={() => removeFile(file.id)}
                              >
                                <X className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                          
                          {(file.status === "uploading" || file.status === "processing") && (
                            <div className="mt-3">
                              <div className="flex justify-between text-xs mb-1">
                                <span>
                                  {file.status === "uploading" ? "Uploading..." : "Processing..."}
                                </span>
                                <span>{Math.round(file.progress)}%</span>
                              </div>
                              <Progress value={file.progress} className="h-1.5" />
                            </div>
                          )}
                          
                          {file.error && (
                            <div className="mt-3 text-xs text-red-500 flex items-center gap-1">
                              <AlertCircle className="h-3.5 w-3.5" />
                              {file.error}
                            </div>
                          )}
                          
                          {file.status === "complete" && file.transcription && (
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs mb-2">
                                <span className="font-medium">Transcription</span>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <Play className="h-3.5 w-3.5 mr-1" />
                                  Play
                                </Button>
                              </div>
                              <div className="text-sm bg-muted/30 p-2 rounded-md max-h-20 overflow-y-auto">
                                <p className="line-clamp-3">
                                  {file.transcription}
                                </p>
                              </div>
                              <div className="flex justify-end mt-2">
                                <Button variant="outline" size="sm" className="text-xs">
                                  View Full Transcription
                                </Button>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Files will be processed using AI for transcription</span>
              </div>
              {files.length > 0 && (
                <Button disabled={files.some(f => f.status === "uploading" || f.status === "processing")}>
                  {files.some(f => f.status === "uploading" || f.status === "processing") 
                    ? "Processing..." 
                    : "View All Transcriptions"
                  }
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Transcription History</CardTitle>
              <CardDescription>View and manage your past transcriptions</CardDescription>
            </CardHeader>
            <CardContent>
              {files.filter(f => f.status === "complete").length > 0 ? (
                <div className="space-y-6">
                  {files
                    .filter(f => f.status === "complete")
                    .map(file => (
                      <div key={file.id} className="border rounded-lg p-4 bg-background/40 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type)}
                            <div>
                              <h4 className="font-medium">{file.name}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <span>{formatFileSize(file.size)}</span>
                                <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                                <span>{formatDuration(file.duration)}</span>
                                <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                                <span>{file.createdAt.toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm">View Details</Button>
                        </div>
                        <Separator className="my-4" />
                        <div>
                          <h5 className="text-sm font-medium mb-2">Transcription Preview</h5>
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {file.transcription}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted/50 p-4 mb-4">
                    <FileAudio className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No transcriptions yet</h3>
                  <p className="text-muted-foreground mt-1 max-w-sm">
                    Upload audio or video files to get started with AI transcription
                  </p>
                  <Button 
                    className="mt-4"
                    onClick={() => setActiveTab("upload")}
                  >
                    Upload Files
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Decorative SVG at the bottom */}
      <div className="absolute bottom-4 right-4 opacity-30 pointer-events-none">
        <svg 
          width="300" 
          height="120" 
          viewBox="0 0 300 120" 
          className="text-primary/20"
        >
          {/* Sound wave visualization */}
          <g transform="translate(0, 60)">
            {[...Array(30)].map((_, i) => {
              const height = Math.sin((i / 30) * Math.PI * 2) * 40 + 10;
              return (
                <motion.rect
                  key={i}
                  x={i * 10}
                  y={-height / 2}
                  width="4"
                  height={height}
                  rx="2"
                  fill="currentColor"
                  initial={{ scaleY: 0.3 }}
                  animate={{
                    scaleY: [0.3, 1, 0.3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    delay: i * 0.1 % 1.5,
                    ease: "easeInOut"
                  }}
                />
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
