
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileUp, Upload } from "lucide-react";

interface UploadSectionProps {
  onFileChange: (file: File | null) => void;
  onUpload: () => void;
  isLoading: boolean;
  fileName?: string;
}

const UploadSection = ({ onFileChange, onUpload, isLoading, fileName }: UploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        onFileChange(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Upload PDF Document</h2>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
          } transition-colors duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="application/pdf"
            className="hidden" 
          />
          
          <FileUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          
          <p className="text-gray-600 mb-4">
            Drag and drop your PDF here, or{" "}
            <button 
              onClick={handleBrowseClick}
              className="text-blue-500 hover:text-blue-700 font-medium"
              type="button"
            >
              browse
            </button>
          </p>
          
          <p className="text-sm text-gray-500">Only PDF files are supported</p>
        </div>

        {fileName && (
          <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 truncate max-w-[70%]">{fileName}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFileChange(null)}
              className="text-gray-500 hover:text-red-500"
            >
              Remove
            </Button>
          </div>
        )}
        
        <Button 
          onClick={onUpload} 
          disabled={!fileName || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 mr-2 rounded-full border-2 border-gray-300 border-t-white animate-spin"></div>
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Extract Text
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default UploadSection;
