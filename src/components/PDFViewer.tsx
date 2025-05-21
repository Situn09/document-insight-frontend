
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

interface PDFViewerProps {
  file: File;
}

const PDFViewer = ({ file }: PDFViewerProps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    // Create a blob URL from the file for preview
    const objectUrl = URL.createObjectURL(file);
    setPdfUrl(objectUrl);

    // Clean up the URL when component unmounts
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  return (
    <Card className="p-4 overflow-hidden">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">PDF Preview</h2>
      <div className="aspect-[4/3] w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        {pdfUrl ? (
          <iframe
            src={`${pdfUrl}#toolbar=0&view=FitH`}
            title="PDF Preview"
            className="w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading preview...</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PDFViewer;
