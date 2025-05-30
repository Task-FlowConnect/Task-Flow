import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkflowStore, createBlock } from '../store/workflowStore';
import Layout from '../components/layout/Layout';
import Sidebar from '../components/workflow/Sidebar';
import Canvas from '../components/workflow/Canvas';
import WorkflowToolbar from '../components/workflow/WorkflowToolbar';
import { BlockType } from '../types';

const WorkflowPage: React.FC = () => {
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const { addBlock, isDirty, setIsDirty } = useWorkflowStore();

  // Load workflow on initial render
  useEffect(() => {
    const { loadWorkflow } = useWorkflowStore.getState();
    loadWorkflow();
  }, []);

  // Handle unsaved changes warning
  useEffect(() => {
    // Function to handle page unload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        e.returnValue = message;
        return message;
      }
    };

    // Function to handle navigation away
    const handleBeforeNavigate = (e: PopStateEvent) => {
      if (isDirty && !window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        // Cancel navigation and restore the URL
        window.history.pushState(null, '', window.location.pathname);
        e.preventDefault();
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleBeforeNavigate);

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleBeforeNavigate);
    };
  }, [isDirty, navigate]);

  // Handle zoom
  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const handleResetView = () => {
    setScale(1);
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const blockType = e.dataTransfer.getData('blockType') as BlockType;
    
    if (blockType) {
      // Calculate position relative to canvas
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / scale;
      const y = (e.clientY - rect.top) / scale;
      
      // Create and add new block
      const newBlock = createBlock(blockType, { x, y });
      addBlock(newBlock);
      setIsDirty(true);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Layout showFooter={false}>
      <div className="flex h-screen pt-16 bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <WorkflowToolbar
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onReset={handleResetView}
          />
          <div 
            className="flex-1 overflow-hidden"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Canvas scale={scale} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WorkflowPage;