'use client';

import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Button from './Button';

interface UploadImageProps {
  onImageCapture: (imageData: string) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({ onImageCapture }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        onImageCapture(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setImagePreview(imageSrc);
      onImageCapture(imageSrc);
      setShowCamera(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {!showCamera && !imagePreview && (
        <div className="w-full max-w-sm space-y-4">
          <Button
            onClick={() => setShowCamera(true)}
            className="w-full"
          >
            Take Photo
          </Button>
          <div className="relative w-full">
            <Button
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              className="w-full"
            >
              Upload Image
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      )}

      {showCamera && (
        <div className="w-full space-y-3">
          <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg" style={{ height: '240px' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="absolute inset-0 w-full h-full object-cover"
              videoConstraints={{
                width: 1280,
                height: 720,
                facingMode: "environment"
              }}
            />
          </div>
          <div className="flex justify-center space-x-3">
            <Button onClick={handleCameraCapture}>Capture</Button>
            <Button
              variant="secondary"
              onClick={() => setShowCamera(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {imagePreview && (
        <div className="w-full space-y-3">
          <div className="relative w-full max-w-lg mx-auto overflow-hidden rounded-lg" style={{ height: '240px' }}>
            <img
              src={imagePreview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain bg-gray-100"
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => {
                setImagePreview(null);
                setShowCamera(false);
              }}
            >
              Retake
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage; 