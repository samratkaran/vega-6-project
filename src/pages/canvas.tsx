import { useEffect, useRef } from "react";
import * as fabric from "fabric";
import { searchSpecificImage } from "../utils/searchImage";
import { useParams } from "react-router-dom";

const Canvas = () => {
  const canvasRef = useRef<fabric.Canvas | null>(null);
  const htmlCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const { id } = useParams();
  const extractedId = id?.split("=")[1].replace(";", "");

  useEffect(() => {
    // Initialize the Fabric canvas if not already initialized
    if (htmlCanvasRef.current && !canvasRef.current) {
      canvasRef.current = new fabric.Canvas(htmlCanvasRef.current, {
        width: 800,
        height: 600,
      });
    }

    const loadImage = async () => {
      if (!extractedId) {
        console.error("No valid ID found.");
        return;
      }

      try {
        const imageUrl = await searchSpecificImage(Number(extractedId));
        console.log("Image URL:", imageUrl);

        if (canvasRef.current && imageUrl) {
          // Load the image and wait for it to be fully loaded
          fabric.Image.fromURL(imageUrl, (img) => {
            if (img) {
              img.scaleToWidth(canvasRef.current.getWidth());
              img.scaleToHeight(canvasRef.current.getHeight());
              canvasRef.current.add(img);
              canvasRef.current.renderAll();
            } else {
              console.error("Failed to load image from URL.");
            }
          });
        }
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    loadImage();
  }, [extractedId]);

  const addRectangle = () => {
    const rect = new fabric.Rect({
      width: 100,
      height: 100,
      fill: "blue",
      left: 50,
      top: 50,
    });
    canvasRef.current?.add(rect);
    canvasRef.current?.renderAll();
  };

  const addText = () => {
    // Use fabric.IText for editable text
    const editableText = new fabric.IText("Click to edit", {
      left: 150,
      top: 150,
      fontSize: 24,
    });
  
    canvasRef.current?.add(editableText);
    canvasRef.current?.setActiveObject(editableText);
    canvasRef.current?.renderAll();
  };

  const downloadImage = () => {
    if (canvasRef.current) {
      // Convert the canvas to a data URL
      const dataURL = canvasRef.current.toDataURL({
        format: "png",
        quality: 1,
      });

      // Create a temporary link to trigger the download
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "canvas-image.png"; // Set the desired file name
      link.click();
    }
  };

  return (
    <>
      <h1 className="font-extrabold mt-10 text-center text-3xl">
        Edit Image on Canvas
      </h1>
      <div className="flex justify-center items-center">
        <canvas
          ref={htmlCanvasRef}
          className="border-4 mt-4"
          width={500}
          height={400}
        />
        <div className="flex gap-4 ml-10 flex-col border">
          <button
            onClick={addRectangle}
            className="border bg-blue-400 p-2 rounded"
          >
            Add Rectangle
          </button>
          <button onClick={addText} className="border bg-blue-400 p-2 rounded">
            Add Text
          </button>
          <button
            onClick={downloadImage}
            className="border bg-green-400 p-2 rounded"
          >
            Download Image
          </button>
        </div>
      </div>
    </>
  );
};

export default Canvas;
