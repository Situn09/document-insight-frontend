
import { useState } from "react";
import UploadSection from "@/components/UploadSection";
import PDFViewer from "@/components/PDFViewer";
import ContentDisplay from "@/components/ContentDisplay";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfContent, setPdfContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleFileChange = (file: File | null) => {
    setPdfFile(file);
    setPdfContent(null);
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Create form data to send the file
    const formData = new FormData();
    formData.append("pdf", pdfFile);

    try {
      // Note: This URL should be replaced with your actual Python backend endpoint
      const response = await fetch("http://localhost:5000/extract-text", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPdfContent(data.content);
      toast({
        title: "Success!",
        description: "PDF content extracted successfully",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error processing PDF",
        description: "There was a problem extracting text from your PDF",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PDF Content Extractor</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload a PDF file and extract its text content for easy viewing and analysis
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <UploadSection 
              onFileChange={handleFileChange} 
              onUpload={handleUpload} 
              isLoading={isLoading} 
              fileName={pdfFile?.name}
            />
            
            {pdfFile && (
              <PDFViewer file={pdfFile} />
            )}
          </div>

          <ContentDisplay content={pdfContent} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
