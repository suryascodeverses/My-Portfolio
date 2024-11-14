// components/DrawLine/DrawLine.tsx

"use client"; // This makes the component a Client Component

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const DrawLine: React.FC = () => {
  const lineRef = useRef<SVGLineElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Ensure lineRef and dotRef are not null
      if (lineRef.current && dotRef.current) {
        const scrollY = window.scrollY; // Get the vertical scroll position
        const lineLength = lineRef.current.getTotalLength(); // Get the total length of the line
        const scrollHeight = document.body.scrollHeight - window.innerHeight; // Calculate the scrollable height
        const scrollPercentage = Math.min(Math.max(scrollY / scrollHeight, 0), 1); // Clamp value between 0 and 1
        const drawLength = lineLength * scrollPercentage; // Calculate how much of the line to draw

        // Update line dash properties using setAttribute
        lineRef.current.setAttribute('stroke-dasharray', String(lineLength));
        lineRef.current.setAttribute('stroke-dashoffset', String(lineLength - drawLength));

        // Get the position of the dot based on the line
        const dotPosition = lineRef.current.getPointAtLength(drawLength);
        dotRef.current.style.transform = `translate(${dotPosition.x}px, ${dotPosition.y}px)`; // Move the dot
      }
    };

    window.addEventListener('scroll', handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup event listener on unmount
    };
  }, []);

  return (
    <div style={{ position: 'relative', height: '200vh' }}>
      <svg width="100%" height="100%">
        <motion.line
          ref={lineRef}
          x1="10"
          y1="100"
          x2="500"
          y2="500"
          stroke="black"
          strokeWidth="2"
          style={{
            strokeDasharray: '1000', // Adjust based on your line length
            strokeDashoffset: '1000', // Initially hide the line
            transition: 'stroke-dashoffset 0.1s ease',
          }}
        />
      </svg>
      <motion.div
        ref={dotRef}
        style={{
          position: 'absolute',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'red',
          top: '0',
          left: '0',
          transform: 'translate(-50%, -50%)', // Center the dot
        }}
      />
    </div>
  );
};

export default DrawLine;
