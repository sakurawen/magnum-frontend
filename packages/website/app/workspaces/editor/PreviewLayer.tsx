'use client';
import { useDragLayer, XYCoord } from 'react-dnd';

function getItemStyles(initialOffset?: XYCoord, currentOffset?: XYCoord) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}
const PreviewLayer = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset() || undefined,
      currentOffset: monitor.getSourceClientOffset() || undefined,
      isDragging: monitor.isDragging(),
    }));
  console.log(item);
  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-full z-50">
      <div
        className="inline-block"
        style={getItemStyles(initialOffset, currentOffset)}
      >
        {item && <item.componentType {...item.internal} />}
      </div>
    </div>
  );
};

export default PreviewLayer;
