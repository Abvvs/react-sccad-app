import { X } from "lucide-react";

interface GalleryImage {
  url: string;
  alt: string;
  title: string;
  category: string;
}

interface GalleryLightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const GalleryLightbox = ({ image, onClose }: GalleryLightboxProps) => {
  if (!image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-[95vw] max-h-[95vh] p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full
                     bg-primary/80 hover:bg-primary transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="flex flex-col items-center">
          <img
            src={image.url}
            alt={image.alt}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
          />

          <div className="mt-6 text-center">
            <h3 className="text-2xl text-foreground mb-2">
              {image.title}
            </h3>
            <span className="inline-block px-4 py-2 rounded-full text-sm bg-primary text-primary-foreground">
              {image.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryLightbox;
