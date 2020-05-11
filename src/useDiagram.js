import { useRef, useState, useEffect } from 'react';
import go from 'gojs';

export default (data) => {
  const graph = useRef();
  const $ = go.GraphObject.make;
  const [diagram, setDiagram] = useState();
  const { entitys, relations } = data;
  useEffect(() => {
    if (graph.current && !diagram) {
      setDiagram(
        $(go.Diagram, graph.current, { // enable undo & redo
          'undoManager.isEnabled': true,
        }),
      );
    } else {
      diagram.nodeTemplate = $(go.Node, 'Auto', // the Shape will go around the TextBlock
        $(go.Shape, 'RoundedRectangle',
          { strokeWidth: 0, fill: 'white' }, // default fill is white
          // Shape.fill is bound to Node.data.color
          new go.Binding('fill', 'color')),
        $(go.TextBlock,
          { margin: 8 }, // some room around the text
          // TextBlock.text is bound to Node.data.key
          new go.Binding('text', 'key')));
      diagram.model = new go.GraphLinksModel(
        [...entitys],
        [...relations],
      );
    }
  }, [diagram, $, entitys, relations]);

  return graph;
};
