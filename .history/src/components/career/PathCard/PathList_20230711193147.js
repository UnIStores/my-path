import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { throttle } from "lodash";
import usePathCardStore from "../../../stores/usePathCardStore";

const userId = "wkdrmadl3";

const PathList = () => {
  const nav = useNavigate();
  const pathCardStore = usePathCardStore();
  const containerRef = useRef(null);
  const [cardColumn, setCardColumn] = useState(null);
  const [hoverCard, setHoverCard] = useState(null);
  const [isContextMenu, setIsContextMenu] = useState(false);

  const goToPathWrite = (pathId) => {
    nav("/write/" + pathId);
  };

  const createPath = async () => {
    const pathId = await pathCardStore.createPath(userId);
    if (pathId) {
      goToPathWrite(pathId);
    }
  };

  useEffect(() => {
    const getMaxCardCount = () => {
      const { width } = containerRef.current.getBoundingClientRect();
      let columnCount = Math.ceil(width / 300);
      return columnCount > 1 ? columnCount : 1;
    };

    setCardColumn(getMaxCardCount);

    const resizeObserver = new ResizeObserver(
      throttle(() => {
        setCardColumn(getMaxCardCount);
      }, 100)
    );
    resizeObserver.observe(containerRef.current);
  }, []);

  return (
    <PathContainer ref={containerRef}>
      <PathCardWrapper cardColumn={cardColumn}>
        <PathCard onClick={createPath}>
          <AddButtonImageWrapper>
            <AddButtonImage
              src={`${process.env.PUBLIC_URL}/images/bigAddButton.svg`}
            />
          </AddButtonImageWrapper>
        </PathCard>
      </PathCardWrapper>
      {pathCardStore.pathList.map((path) => (
        <PathCardWrapper
          key={path._id}
          cardColumn={cardColumn}
          onMouseEnter={() => setHoverCard(path)}
          onMouseLeave={() => setHoverCard(null)}
        >
          <PathCard
            onClick={() => {
              goToPathWrite(path._id);
            }}
          >
            <PathCardTitle>{path.title}</PathCardTitle>
            {hoverCard?._id === path._id && (
              <PathCardOptionWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContextMenu((prev) => !prev);
                }}
              >
                <PathCarOptionImg
                  src={`${process.env.PUBLIC_URL}/images/optionDots.svg`}
                />
              </PathCardOptionWrapper>
            )}
          </PathCard>
        </PathCardWrapper>
      ))}
      {isContextMenu && (
        <CardContextMenu>
          <SubMenu>수정</SubMenu>
          <SubMenu>삭제</SubMenu>
          <SubMenu>이미지</SubMenu>
        </CardContextMenu>
      )}
    </PathContainer>
  );
};

export default PathList;

const PathContainer = styled.div`
  flex: 1;
  margin-top: 3rem;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
`;

const PathCardWrapper = styled.div`
  padding: 1rem;
  flex-basis: ${(props) => `${100 / props.cardColumn}%`};
  min-width: 15rem;
`;

const PathCard = styled.div`
  position: relative;
  height: 100%;
  border-radius: 0.5rem;
  min-height: 15rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: white;
`;

const PathCardTitle = styled.span`
  display: block;
  font-size: 2.5rem;
  margin: 1rem;
  white-space: break-spaces;
`;

const AddButtonImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const AddButtonImage = styled.img`
  width: 7rem;
  height: 7rem;
`;

const PathCardOptionWrapper = styled.div`
  position: absolute;
  padding: 0.5rem;
  right: 0.5rem;
  top: 1rem;
  width: 1.5rem;
  height: 3rem;
  border-radius: 0.5rem;
  :hover {
    background: rgba(55, 53, 47, 0.1);
  }
`;

const PathCarOptionImg = styled.img`
  width: 100%;
  height: 100%;
`;

const OverlayWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const CardContextMenu = styled.div`
  background: white;
  border: 1px solid rgba(55, 53, 47, 0.2);
  border-radius: 0.5rem;
`;

const SubMenu = styled.div``;
