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
