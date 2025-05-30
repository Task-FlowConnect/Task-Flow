import React from 'react';
import { useWorkflowStore } from '../../store/workflowStore';
import { Save, RefreshCw, Undo, Redo, ZoomIn, ZoomOut } from 'lucide-react';

interface WorkflowToolbarProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const WorkflowToolbar: React.FC<WorkflowToolbarProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
}) => {
  const { saveWorkflow, loadWorkflow, resetWorkflow, isDirty } = useWorkflowStore();

  return (
    <div className="bg-white p-2 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          className="p-2 rounded hover:bg-gray-100 text-gray-700 flex items-center"
          onClick={onZoomIn}
          title="Zoom In"
        >
          <ZoomIn size={18} />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100 text-gray-700 flex items-center"
          onClick={onZoomOut}
          title="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100 text-gray-700 flex items-center"
          onClick={onReset}
          title="Reset View"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className={`px-3 py-2 rounded flex items-center ${
            isDirty
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500'
          }`}
          onClick={saveWorkflow}
          disabled={!isDirty}
          title="Save Workflow"
        >
          <Save size={18} className="mr-1" />
          <span>Save</span>
          {isDirty && <span className="ml-1 text-xs">*</span>}
        </button>
        <button
          className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center"
          onClick={loadWorkflow}
          title="Load Workflow"
        >
          <Undo size={18} className="mr-1" />
          <span>Load</span>
        </button>
        <button
          className="px-3 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center"
          onClick={resetWorkflow}
          title="Clear Workflow"
        >
          <Redo size={18} className="mr-1" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
};

export default WorkflowToolbar;