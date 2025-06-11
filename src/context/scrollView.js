import {useRef} from 'react';

export const useScrollDirection = (onScrollUp, onScrollDown, threshold = 5) => {
  const scrollOffset = useRef(0);

  const handleScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const diff = currentOffset - scrollOffset.current;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        onScrollDown();
      } else {
        onScrollUp();
      }
    }

    scrollOffset.current = currentOffset;
  };

  return handleScroll;
};
