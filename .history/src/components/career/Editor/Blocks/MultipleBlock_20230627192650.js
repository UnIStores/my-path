import React from "react";
import EditBranchComponent from "../EditBranchComponent";
import styled from "@emotion/styled";

const MultipleBlock = ({
  updateElement,
  movementSide,
  data,
  changeShowFileUploader,
  style,
  isOverlay,
}) => {
  return (
    <RowWrapper direction={data?.direction}>
      {data?.multipleData.map((element) => (
        <ColumnWrapper key={element?.uuid} blockWidth={element?.width}>
          <EditBranchComponent
            key={element.uuid}
            data={element}
            updateElement={updateElement}
            movementSide={movementSide}
            changeShowFileUploader={changeShowFileUploader}
            isOverlay={isOverlay}
          />
        </ColumnWrapper>
      ))}
      {style ? <div style={style}></div> : null}
    </RowWrapper>
  );
};

export default MultipleBlock;

const RowWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: ${(props) => props.direction};
  flex: 1;
`;

const ColumnWrapper = styled.div`
  width: ${(props) => (props.blockWidth ? `${props.blockWidth}%` : `100%`)};
  /* width: ${(props) =>
    `${
      props.direction && props.width
        ? `calc(100% * ${props.width} / 100)`
        : `100%`
    }`}; */
`;
