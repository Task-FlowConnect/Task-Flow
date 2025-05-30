import React, { useRef, useState, useEffect } from 'react';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { useWorkflowStore } from '../../store/workflowStore';
import Block from './Block';
import { Position } from '../../types';

interface CanvasProps {
  scale: number;
}

const Canvas: React.FC<CanvasProps> = ({ scale }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPan, setStartPan] = useState<Position>({ x: 0, y: 0 });
  const [pan, setPan] = useState<Position>({ x: 0, y: 0 });
  const [connecting, setConnecting] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 3000, height: 3000 });

  const { blocks, connections, addConnection } = useWorkflowStore();

  // Update canvas size on mount and resize
  useEffect(() => {
    const updateCanvasSize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        setCanvasSize({
          width: Math.max(3000, rect.width * 3),
          height: Math.max(3000, rect.height * 3)
        });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  // Handle canvas panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0 && e.target === canvasRef.current) {
      setIsDragging(true);
      setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle connection creation
  const handleConnectionStart = (blockId: string) => {
    setConnecting(blockId);
  };

  const handleConnectionEnd = (blockId: string) => {
    if (connecting && connecting !== blockId) {
      addConnection(connecting, blockId);
      setConnecting(null);
    }
  };

  // Calculate visible grid area based on viewport and pan position
  const getVisibleGridArea = () => {
    if (!canvasRef.current) return { minX: 0, maxX: 0, minY: 0, maxY: 0 };

    const gridSize = 20 * scale;
    const buffer = 2; // Number of grid cells to render beyond visible area

    const minX = Math.floor(-pan.x / gridSize - buffer) * gridSize;
    const maxX = Math.ceil((canvasSize.width - pan.x) / gridSize + buffer) * gridSize;
    const minY = Math.floor(-pan.y / gridSize - buffer) * gridSize;
    const maxY = Math.ceil((canvasSize.height - pan.y) / gridSize + buffer) * gridSize;

    return { minX, maxX, minY, maxY };
  };

  // Create grid lines
  const renderGrid = () => {
    const { minX, maxX, minY, maxY } = getVisibleGridArea();
    const gridLines = [];
    const gridSize = 20 * scale;

    // Horizontal lines
    for (let y = minY; y <= maxY; y += gridSize) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={minX}
          y1={y}
          x2={maxX}
          y2={y}
          stroke="#e5e7eb"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      );
    }

    // Vertical lines
    for (let x = minX; x <= maxX; x += gridSize) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={minY}
          x2={x}
          y2={maxY}
          stroke="#e5e7eb"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      );
    }

    return gridLines;
  };

  return (
    <div
      className="w-full h-full overflow-hidden relative bg-white"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="absolute"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
          transformOrigin: '0 0',
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      >
        <svg 
          className="absolute top-0 left-0 pointer-events-none"
          width={canvasSize.width}
          height={canvasSize.height}
        >
          {renderGrid()}
        </svg>

        <Xwrapper>
          {blocks.map((block) => (
            <Block
              key={block.id}
              block={block}
              scale={scale}
              onConnectionStart={handleConnectionStart}
              onConnectionEnd={handleConnectionEnd}
              isConnecting={connecting !== null}
              isConnectionTarget={connecting !== null && connecting !== block.id}
            />
          ))}

          {connections.map((connection) => (
            <Xarrow
              key={connection.id}
              start={connection.from}
              end={connection.to}
              color="#3b82f6"
              strokeWidth={2}
              path="smooth"
              startAnchor="bottom"
              endAnchor="top"
              curveness={0.3}
            />
          ))}
        </Xwrapper>
      </div>
    </div>
  );
};

export default Canvas;