export interface NavItem {
  label: string;
  href: string;
}

export interface BlockData {
  id: string;
  type: BlockType;
  position: Position;
  data: Record<string, any>;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
}

export interface Position {
  x: number;
  y: number;
}

export enum BlockType {
  TASK = 'task',
  CONDITION = 'condition',
  ACTION = 'action'
}

export interface WorkflowState {
  blocks: BlockData[];
  connections: Connection[];
  isDirty: boolean;
  setIsDirty: (isDirty: boolean) => void;
  addBlock: (block: BlockData) => void;
  updateBlockPosition: (id: string, position: Position) => void;
  removeBlock: (id: string) => void;
  addConnection: (from: string, to: string) => void;
  removeConnection: (id: string) => void;
  saveWorkflow: () => void;
  loadWorkflow: () => void;
  resetWorkflow: () => void;
}