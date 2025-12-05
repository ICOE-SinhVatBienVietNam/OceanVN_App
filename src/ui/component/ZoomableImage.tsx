import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";

interface ZoomableImageProps {
  src: string;
  alt: string;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({ src, alt }) => {
  const [scale, setScale] = useState(1);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleRef = useRef(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Reset position when scale is 1
  useEffect(() => {
    if (scale === 1) {
      x.set(0);
      y.set(0);
    }
  }, [scale, x, y]);

  useEffect(() => {
    if (containerRef.current) {
      setContainerSize({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  const handleWheel = (event: React.WheelEvent) => {
    const delta = -event.deltaY / 500;
    let newScale = scale + delta;
    if (newScale < 1) newScale = 1;
    newScale = Math.min(newScale, 4); // Max zoom 4x
    setScale(newScale);
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    const aspectRatio = naturalWidth / naturalHeight;
    const containerAspectRatio = containerSize.width / containerSize.height;

    if (aspectRatio > containerAspectRatio) {
      setImageSize({
        width: containerSize.width,
        height: containerSize.width / aspectRatio,
      });
    } else {
      setImageSize({
        width: containerSize.height * aspectRatio,
        height: containerSize.height,
      });
    }
  };

  const dragConstraints = {
    left: - (imageSize.width * scale - containerSize.width) / 2,
    right: (imageSize.width * scale - containerSize.width) / 2,
    top: - (imageSize.height * scale - containerSize.height) / 2,
    bottom: (imageSize.height * scale - containerSize.height) / 2,
  };

  const handleDoubleClick = () => {
    setScale(prevScale => prevScale > 1 ? 1 : 2);
  };

  return (
    <motion.div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
      style={{ touchAction: "none" }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="object-contain"
        onLoad={handleImageLoad}
        style={{
          scale,
          x,
          y,
          cursor: scale > 1 ? "grab" : "auto",
        }}
        drag={scale > 1}
        dragConstraints={scale > 1 ? dragConstraints : false}
        dragElastic={0.1}
        whileDrag={{ cursor: "grabbing" }}
        onPinchStart={() => {
          scaleRef.current = scale;
        }}
        onPinch={(event, info) => {
          let newScale = scaleRef.current * info.offset.x;
          if (newScale < 1) newScale = 1;
          newScale = Math.min(newScale, 4);
          setScale(newScale);
        }}
      />
    </motion.div>
  );
};

export default ZoomableImage;
