import { useState } from "react";
import { CgTimelapse } from "react-icons/cg";
import { AiFillStar } from "react-icons/ai";

export default function Card(props) {
  const dur = `${parseInt(props.length / 60)}: ${props.length % 60}`;
  const [hovered, setHovered] = useState(false);
  return (
    <section
      id="container"
      className="relative h-full min-w-[250px] rounded-lg overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        id="overlay"
        className={`absolute h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.7)] text-white text-2xl transition-all ease-in-out duration-200 ${
          hovered ? "opacity-100 z-10 " : "opacity-0"
        } `}
      >
        <div className="h-full w-full flex flex-col justify-center">
          <h3 className="flex flex-grow justify-center items-center">
            {props.name}
          </h3>
          <div className="text-sm">
            <p className="flex justify-center items-center gap-2">
              duration: <CgTimelapse /> {dur}
            </p>
            <p className="flex justify-center items-center gap-2">
              ratings: {props.rating} <AiFillStar />
            </p>
          </div>
        </div>
      </div>
      <img
        id="movieImg"
        className={`absolute h-full w-full object-cover transition-all duration-200 ease-in-out ${
          hovered ? "scale-105" : "scale-100"
        } `}
        src={props.imgUrl}
        alt={props.name}
      />
    </section>
  );
}
