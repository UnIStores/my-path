import React, { useEffect } from "react";
import styled from "@emotion/styled";

const DraggbleSelection = ({ pointer, currentPoint }) => {
  const [left, right] = [pointer?.x, currentPoint?.x].sort((a, b) => a - b);
  const [top, bottom] = [pointer?.y, currentPoint?.y].sort((a, b) => a - b);
  useEffect(() => {}, [pointer, currentPoint]);
  return (
    <SelectionWrapper
      left={left}
      right={right}
      top={top}
      bottom={bottom}
    ></SelectionWrapper>
  );
};

export default DraggbleSelection;

const SelectionWrapper = styled.div`
  position: absolute;
  /* left: 0;
  right: 100px;
  top: 0;
  bottom: 100px; */
  left: ${(props) => `${props?.left}px`};
  right: ${(props) => `${props?.right}px`};
  top: ${(props) => `${props?.top}px`};
  bottom: ${(props) => `${props?.bottom}px`};
  background: red;
`;
