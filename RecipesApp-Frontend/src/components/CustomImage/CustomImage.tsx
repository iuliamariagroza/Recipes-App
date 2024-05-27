import "./custom-image.css";

interface CustomImageProps {
  imgSrc: string;
  pt: string | number;
}

export default function CustomImage({ imgSrc, pt }: CustomImageProps) {
  return (
    <img
      className="custom-image"
      style={{ paddingBottom: pt }}
      src={imgSrc}
      alt=""
    />
  );
}
