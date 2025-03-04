/* eslint-disable */
// Workaround for issue with react-beautiful-dnd in React 18
import { JSXElementConstructor, ReactNode } from 'react';
import {
  DragDropContext as OriginalDragDropContext,
  Draggable as OriginalDraggable,
  Droppable as OriginalDroppable,
  DroppableProps,
  DraggableProps,
  DragDropContextProps
} from 'react-beautiful-dnd';

declare module 'react-beautiful-dnd' {
  export class DragDropContext extends OriginalDragDropContext {
    constructor(props: DragDropContextProps);
    static displayName: string;
    render(): ReactNode;
  }

  export class Droppable extends OriginalDroppable {
    constructor(props: DroppableProps);
    static displayName: string;
    render(): ReactNode;
  }

  export class Draggable extends OriginalDraggable {
    constructor(props: DraggableProps);
    static displayName: string;
    render(): ReactNode;
  }

  // Add explicit refs property
  export interface ComponentClass<P = {}, S = any> extends JSXElementConstructor<P> {
    refs: { [key: string]: any };
    new(props: P, context?: any): Component<P, S>;
  }
}