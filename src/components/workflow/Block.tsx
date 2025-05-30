import React, { useState } from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { BlockData, Position } from '../../types';
import { MoreHorizontal, Link as LinkIcon, Trash2 } from 'lucide-react';

interface BlockProps {
  block: BlockData;
  scale: number;
  onConnectionStart: (blockId: string) => void;
  onConnectionEnd: (blockId: string) => void;
  isConnecting: boolean;
  isConnectionTarget: boolean;
}

const Block: React.FC<BlockProps> = ({
  block,
  scale,
  onConnectionStart,
  onConnectionEnd,
  isConnecting,
  isConnectionTarget,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);

  const { updateBlockPosition, removeBlock } = useWorkflowStore();

  // Handle block dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only handle left click
    e.stopPropagation();
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const canvasRect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
    
    if (!canvasRect) return;
    
    setIsDragging(true);
    setDragOffset({
      x: (e.clientX - rect.left),
      y: (e.clientY - rect.top)
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.stopPropagation();
    e.preventDefault();

    const canvasRect = (e.currentTarget as HTMLElement).parentElement?.getBoundingClientRect();
    if (!canvasRect) return;

    const newPosition = {
      x: (e.clientX - dragOffset.x - canvasRect.left) / scale,
      y: (e.clientY - dragOffset.y - canvasRect.top) / scale
    };

    updateBlockPosition(block.id, newPosition);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.stopPropagation();
    setIsDragging(false);
  };

  // Handle connection creation
  const handleStartConnection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConnectionStart(block.id);
    setShowMenu(false);
  };

  const handleEndConnection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isConnectionTarget) {
      onConnectionEnd(block.id);
    }
  };

  // Determine block style based on type
  const getBlockStyle = () => {
    switch (block.type) {
      case 'task':
        return 'bg-blue-50 border-blue-400';
      case 'condition':
        return 'bg-yellow-50 border-yellow-400';
      case 'action':
        return 'bg-purple-50 border-purple-400';
      default:
        return 'bg-gray-50 border-gray-400';
    }
  };

  // Block content based on type
  const renderBlockContent = () => {
    switch (block.type) {
      case 'task':
        return (
          <>
            <h3 className="font-medium text-gray-900">{block.data.title}</h3>
            <p className="text-sm text-gray-500">{block.data.description}</p>
          </>
        );
      case 'condition':
        return (
          <>
            <h3 className="font-medium text-gray-900">Condition</h3>
            <code className="text-sm bg-gray-100 px-1 py-0.5 rounded">{block.data.condition}</code>
          </>
        );
      case 'action':
        return (
          <>
            <h3 className="font-medium text-gray-900">Action</h3>
            <p className="text-sm text-gray-500">{block.data.action}</p>
          </>
        );
      default:
        return <p>Unknown block type</p>;
    }
  };

  return (
    <div
      id={block.id}
      className={`absolute p-4 rounded-lg border-2 shadow-md select-none ${getBlockStyle()} ${
        isConnectionTarget ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{
        left: `${block.position.x}px`,
        top: `${block.position.y}px`,
        width: 200,
        transform: `scale(${1 / scale})`,
        transformOrigin: 'top left',
        zIndex: isDragging ? 10 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={isConnecting ? handleEndConnection : undefined}
    >
      <div className="flex justify-between items-start">
        {renderBlockContent()}
        <div className="relative">
          <button 
            className="p-1 text-gray-400 hover:text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
          >
            <MoreHorizontal size={16} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 mt-1 py-1 w-36 bg-white rounded-md shadow-lg z-10">
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                onClick={handleStartConnection}
              >
                <LinkIcon size={14} className="mr-2" />
                Connect
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  removeBlock(block.id);
                  setShowMenu(false);
                }}
              >
                <Trash2 size={14} className="mr-2" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Connection points */}
      <div 
        className="absolute w-4 h-4 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600" 
        style={{ bottom: -8, left: '50%', transform: 'translateX(-50%)' }}
        onClick={handleStartConnection}
      />
      <div 
        className="absolute w-4 h-4 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600" 
        style={{ top: -8, left: '50%', transform: 'translateX(-50%)' }}
        onClick={handleEndConnection}
      />
    </div>
  );
};

export default Block;