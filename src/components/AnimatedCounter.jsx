import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({ value, prefix = "" }) {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 100, stiffness: 100 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [motionValue, isInView, value]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                // Format with commas and 2 decimals
                ref.current.textContent = prefix + latest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        });
    }, [springValue, prefix]);

    return <span ref={ref} />;
}