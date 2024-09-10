import React from 'react';
interface FileWithPreview extends File {
  preview: string;
}
interface UploadFilesProps {
    files: FileWithPreview[];
    setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
    handleUpload: () => Promise<void>;
    imageUrls: string[];
    setIsOpen: (open: boolean) => void;
    onRemoveImage: (index: number) => void;
}

const UploadFiles: React.FC<UploadFilesProps> = ({
    files,
    setFiles,
    handleUpload,
    imageUrls,
    setIsOpen,
    onRemoveImage
}) => {
    return (
        <div>
            <div className="mb-4">
                {imageUrls.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        {imageUrls.map((url, index) => (
                            <div key={url} className="relative">
                                <img src={url} alt={`Image ${index + 1}`} className="w-32 h-32 object-cover" />
                                <button
                                    type="button"
                                    onClick={() => onRemoveImage(index)}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Hiển thị các file được chọn */}
            {files.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {files.map(file => (
                        <div key={file.preview} className="relative">
                            <img src={file.preview} alt={file.name} className="w-32 h-32 object-cover" />
                            <button
                                type="button"
                                onClick={() => setFiles(prev => prev.filter(f => f.preview !== file.preview))}
                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadFiles;
