import React from 'react';
import { useWorkflowStore, createBlock } from '../../store/workflowStore';
import { BlockType } from '../../types';
import { Clipboard, GitBranch, Play } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { addBlock } = useWorkflowStore();

  const handleDragStart = (e: React.DragEvent, type: BlockType) => {
    e.dataTransfer.setData('blockType', type);
  };

  const blockTypes = [
    {
      type: BlockType.TASK,
      label: 'Task',
      description: 'A task to be completed',
      icon: <Clipboard size={20} />,
      color: 'bg-blue-100 text-blue-700 border-blue-300'
    },
    {
      type: BlockType.CONDITION,
      label: 'Condition',
      description: 'A condition to check',
      icon: <GitBranch size={20} />,
      color: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    },
    {
      type: BlockType.ACTION,
      label: 'Action',
      description: 'An action to perform',
      icon: <Play size={20} />,
      color: 'bg-purple-100 text-purple-700 border-purple-300'
    }
  ];

  // Handle block creation
  const handleBlockCreate = (type: BlockType) => {
    const newBlock = createBlock(type, { x: 100, y: 100 });
    addBlock(newBlock);
  };

  return (
    <div className="bg-white w-64 h-full overflow-y-auto shadow-md p-4">
      <h2 className="text-lg font-bold mb-4">Blocks</h2>
      <div className="space-y-3">
        {blockTypes.map((blockType) => (
          <div
            key={blockType.type}
            className={`p-3 rounded border ${blockType.color} cursor-grab`}
            draggable
            onDragStart={(e) => handleDragStart(e, blockType.type)}
            onClick={() => handleBlockCreate(blockType.type)}
          >
            <div className="flex items-center">
              <div className="mr-2">{blockType.icon}</div>
              <div>
                <h3 className="font-medium">{blockType.label}</h3>
                <p className="text-xs">{blockType.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Help</h2>
        <div className="text-sm text-gray-600 space-y-2">
          <p>• Drag blocks onto the canvas</p>
          <p>• Click and drag to move blocks</p>
          <p>• Use block menu to connect or delete</p>
          <p>• Use mouse wheel to zoom</p>
          <p>• Click and drag on empty space to pan</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;