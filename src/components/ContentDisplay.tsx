
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface ContentDisplayProps {
  content: string | null;
  isLoading: boolean;
}

const ContentDisplay = ({ content, isLoading }: ContentDisplayProps) => {
  return (
    <Card className="p-6 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Extracted Content</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-4"></div>
          <p>Extracting content from PDF...</p>
        </div>
      ) : content ? (
        <ScrollArea className="h-[500px] bg-white rounded-lg p-4 border border-gray-100">
          <div className="whitespace-pre-wrap text-gray-700 font-normal leading-relaxed">
            {content}
          </div>
        </ScrollArea>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <FileText className="h-16 w-16 mb-4" />
          <p className="text-lg font-medium">No content to display</p>
          <p className="text-sm">Upload a PDF and extract its content to view it here</p>
        </div>
      )}
    </Card>
  );
};

export default ContentDisplay;
