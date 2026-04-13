import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            mouseX.set(e.clientX - 16);
            mouseY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="cursor"
            animate={{
                scale: isHovered ? 1.5 : 1,
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 400 }}
            style={{
                translateX: cursorX,
                translateY: cursorY,
                mixBlendMode: 'normal', // Reset blend mode for lens effect
                background: 'rgba(255, 255, 255, 0.05)', // Very subtle tint
                backdropFilter: 'blur(0px)', // Keep view clear
                border: '1px solid rgba(255, 255, 255, 0.8)', // Sharp rim
                boxShadow: isHovered
                    ? '0 0 15px rgba(255, 255, 255, 0.3), inset 0 0 0 2px rgba(255,255,255,0.1)'
                    : 'none', // Lens glow on hover
                zIndex: 9999
            }}
        />
    );
};

export default Cursor;
