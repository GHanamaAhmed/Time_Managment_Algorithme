import { useContext, useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { ProcessContext } from "./context";
export default function Proccess({ proccess, onDrag }) {
  const {
    nOfE,
    messages,
    setMessages,
    senderMessage,
    sendMessage,
    reciveMessage,
    isRepeat,
    proccessus, setProccessus
  } = useContext(ProcessContext);
  const containerRef = useRef(null);
  const draggableRef = useRef(null);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  });
  useEffect(() => {
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => {
      window.removeEventListener("resize", updateBounds);
    };
  }, []);

  const updateBounds = () => {
    const container = containerRef.current;
    const draggable = draggableRef.current;

    if (container && draggable) {
      const containerRect = container.getBoundingClientRect();
      const draggableRect = draggable.getBoundingClientRect();

      // Calculate the boundaries based on the container's position and size
      setBounds({
        left: 0, // Left boundary is set to 0
        top: 0,
        right: containerRect.width - draggableRect.width, // Right boundary is calculated
        bottom: containerRect.height - draggableRect.height, // Bottom boundary is calculated
      });
    }
  };

  const handleDrag = (e, ui) => {
    // Ensure the element stays within the bounds
    if (ui.x < bounds.left) {
      ui.x = bounds.left;
    } else if (ui.x > bounds.right) {
      ui.x = bounds.right;
    }
    if (ui.y < bounds.top) {
      ui.y = bounds.top;
    } else if (ui.y > bounds.bottom) {
      ui.y = bounds.bottom;
    }
    onDrag();
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={updateBounds}
      className="h-1 w-full gap-9 rounded-lg flex items-center container bg-white"
    >
      {[...Array(nOfE[proccess])].map((e, i) => (
        <div
          key={i}
          className=""
          onDoubleClick={() => {
            if (isRepeat(proccess + 1, i + 1)) {
            } else {
              if (senderMessage() == -1) {
                sendMessage(proccess + 1, i + 1);
              } else {
                reciveMessage(proccess + 1, i + 1);
              }
            }
          }}
        >
          <Draggable
            key={i}
            bounds={{ ...bounds, left: i * -48, right: bounds.right + i * -48 }}
            onDrag={handleDrag}
            nodeRef={draggableRef}
          >
            <div
              id={`e${proccess + 1}${i + 1}`}
              className="h-3 bg-blue-500 rounded-full w-3"
              ref={draggableRef}
            >
              <p className="text-white -translate-y-8 cursor-pointer">{`(${proccess+1},${
                proccessus.length
                  ? proccessus?.[proccess ]?.timeOfEvents?.[i]
                  : ``
              })`}</p>
              <p className="text-white -translate-x-4 cursor-pointer">{`e${proccess+1}${
                i + 1
              }`}</p>
            </div>
          </Draggable>
        </div>
      ))}
    </div>
  );
}
