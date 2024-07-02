// CUSTOM HOOK TO TRACK MOUSE POSITION AND CONVERT IT TO A VALUE BETWEEN -1 AND 1 FOR BOTH X AND Y AXES
// USED IN THE 3D SCENE TO MOVE THE CAMERA BASED ON MOUSE POSITION

import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function useMouse() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouse.x.set((clientX / innerWidth) * 2 - 1);
    mouse.y.set(-((clientY / innerHeight) * 2 - 1));
    console.log(mouse.x.get(), mouse.y.get());
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  });

  return mouse;
}
