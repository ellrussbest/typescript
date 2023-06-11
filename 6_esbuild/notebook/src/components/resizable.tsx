// import { useEffect, useState } from "react";
// import "./resizable.css";
// import { ResizableBox, ResizableBoxProps } from "react-resizable";

// interface ResizableProps {
//   direction: "horizontal" | "vertical";
//   children: React.ReactNode;
// }

// const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
//   let resizableProps: ResizableBoxProps;

//   const [innerHeight, setInnerHeight] = useState(window.innerHeight);
//   const [innerWidth, setInnerWidth] = useState(window.innerWidth);
//   const [width, setWidth] = useState(window.innerWidth * 0.75);

//   useEffect(() => {
//     let timer: any;

//     const listener = () => {
//       if (timer) {
//         clearTimeout(timer);
//       }

//       timer = setTimeout(() => {
//         setInnerHeight(window.innerHeight);
//         setInnerWidth(window.innerWidth);
//       }, 100);
//     };

//     window.addEventListener("resize", listener);

//     return () => {
//       window.removeEventListener("resize", listener);
//     };
//   }, []);

//   if (direction === "horizontal") {
//     resizableProps = {
//       className: "resize-horizontal",
//       height: Infinity,
//       width,
//       resizeHandles: ["e"],
//       maxConstraints: [innerWidth * 0.75, Infinity],
//       minConstraints: [innerWidth * 0.2, Infinity],
//       onResizeStop: (event, data) => {
//         setWidth(data.size.width);
//       },
//     };
//   } else {
//     resizableProps = {
//       height: 300,
//       width: Infinity,
//       resizeHandles: ["s"],
//       maxConstraints: [Infinity, innerHeight * 0.9],
//       minConstraints: [Infinity, 50],
//     };
//   }

//   return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
// };

// export default Resizable;

import { useEffect, useState, memo } from "react";
import "./resizable.css";
import { ResizableBox, ResizableBoxProps } from "react-resizable";

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = memo(({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;

    const listener = () => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
      }, 100);
    };

    window.addEventListener("resize", listener);

    return () => {
      window.removeEventListener("resize", listener);
    };
  }, []);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      height: Infinity,
      width,
      resizeHandles: ["e"],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
});

export default Resizable;
