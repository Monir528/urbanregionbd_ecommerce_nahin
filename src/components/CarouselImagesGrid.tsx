import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/reduxToolKit/store";
import { deleteCarouselImage, reorderCarouselImages } from "@/reduxToolKit/carouselImagesSlice";
import { useDrop, useDrag, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MdDelete } from "react-icons/md";
import Image from "next/image";

const ItemType = "CAROUSEL_IMAGE";
const BASE_URL = process.env.NEXT_PUBLIC_ROOT_API || "";

interface CarouselImage {
  _id: string;
  filename: string;
  originalname: string;
}

interface CarouselImageItemProps {
  image: CarouselImage;
  index: number;
  moveImage: (from: number, to: number) => void;
  onDelete: (id: string) => void;
}

function CarouselImageItem({ image, index, moveImage, onDelete }: CarouselImageItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  interface DragItem {
    index: number;
  }

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item: DragItem) {
      if (item.index === index) return;
      moveImage(item.index, index);
      item.index = index;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });
  drag(drop(ref));
  return (
    <div
      ref={ref}
      className={`relative border rounded-lg overflow-hidden group transition-shadow duration-200 shadow-md ${isDragging ? "opacity-50" : ""}`}
      style={{ width: 320, height: 200, margin: 8, background: "#fafafa" }}
    >
      <Image
        src={image.filename.startsWith("http") ? image.filename : `${BASE_URL}/carousel_images/${image.filename}`}
        alt={image.originalname}
        width={320}
        height={200}
        objectFit="cover"
      />
      <button
        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition"
        onClick={() => onDelete(image._id)}
        title="Delete"
      >
        <MdDelete size={22} className="text-red-600" />
      </button>
    </div>
  );
}

const CarouselImagesGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { images } = useSelector((state: RootState) => state.carouselImages);
  const [dragImages, setDragImages] = React.useState<CarouselImage[]>(images);

  React.useEffect(() => {
    setDragImages(images);
  }, [images]);

  const moveImage = (from: number, to: number) => {
    const updated = [...dragImages];
    const [removed] = updated.splice(from, 1);
    updated.splice(to, 0, removed);
    setDragImages(updated);
  };

  const handleDrop = () => {
    if (JSON.stringify(dragImages.map((img) => img._id)) !== JSON.stringify(images.map((img) => img._id))) {
      dispatch(reorderCarouselImages(dragImages.map((img) => img._id)));
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this image?")) {
      dispatch(deleteCarouselImage(id));
    }
  };

  if (!images.length) return <div className="text-gray-500">No carousel images uploaded yet.</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        className="flex flex-wrap"
        style={{ minHeight: 220 }}
        onMouseUp={handleDrop}
      >
        {dragImages.map((image, idx: number) => (
          <CarouselImageItem
            key={image._id}
            image={image}
            index={idx}
            moveImage={moveImage}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CarouselImagesGrid;
