import "./App.css";
import { FiMousePointer } from "react-icons/fi";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function App() {
  return (
    <>
      <div className="grid h-screen w-full place-content-center bg-gradient-to-br from-indigo-500 to-violet-500 px-4 py-12 text-slate-900">
        <TiltCard />
      </div>
    </>
  );
}

const TiltCard = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["17.5deg", "-17.5deg"]
  );

  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-15deg", "15deg"]
  );

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPer = mouseX / width - 0.5;
    const yPer = mouseY / height - 0.5;

    x.set(xPer);
    y.set(yPer);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  }

  return (
    <>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          rotateX,
          rotateY,
        }}
        className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
      >
        <div
          style={{
            transform: "translateZ(75px)",
            transformStyle: "preserve-3d",
          }}
          className="absolute inset-4 grid place-content-center rounded-xl bg-white"
        >
          <FiMousePointer
            style={{
              transform: "translateZ(75px)",
            }}
            className="mx-auto text-4xl "
          />
          <p
            style={{
              transform: "translateZ(75px)",
            }}
            className="text-center text-2xl font-bold"
          >
            HOVER ME
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default App;
