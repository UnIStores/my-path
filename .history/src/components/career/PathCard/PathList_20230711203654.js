import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { throttle } from "lodash";
import usePathCardStore from "../../../stores/usePathCardStore";
import PathCard from "./PathCard";

const userId = "wkdrmadl3";

const PathList = () => {
  const nav = useNavigate();
  const pathCardStore = usePathCardStore();
  const containerRef = useRef(null);
  const [cardColumn, setCardColumn] = useState(null);
  const [hoverCardId, setHoverCardId] = useState(null);
  const [isContextMenu, setIsContextMenu] = useState(false);
  const [contextMenuData, setContextMenuData] = useState({
    pathId: -1,
    x: 0,
    y: 0,
  });

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
        <AddPathCard onClick={() => pathCardStore.create(userId)}>
          <AddButtonImageWrapper>
            <AddButtonImage
              src={`${process.env.PUBLIC_URL}/images/bigAddButton.svg`}
            />
          </AddButtonImageWrapper>
        </AddPathCard>
      </PathCardWrapper>
      {pathCardStore.pathList.map((path) => (
        <PathCardWrapper
          key={path._id}
          cardColumn={cardColumn}
          onMouseEnter={() => setHoverCardId(path._id)}
          onMouseLeave={() => setHoverCardId(null)}
        >
          <PathCard
            pathData={path}
            isHover={hoverCardId === path._id}
            setContextMenuData={setContextMenuData}
            setIsContextMenu={setIsContextMenu}
            contextMenuData={contextMenuData}
          />
        </PathCardWrapper>
      ))}
      {pathCardStore.contextMenuData && (
        <CardContextMenu position={contextMenuData}>
          <SubMenu>수정</SubMenu>
          <SubMenu
            onClick={async () => {
              const result = await pathCardStore.delete(contextMenuData.pathId);

              if (result) {
                setIsContextMenu(false);
                setContextMenuData({ pathId: -1, x: 0, y: 0 });
              }
            }}
          >
            삭제
          </SubMenu>
          {/* <SubMenu>이미지</SubMenu> */}
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

const AddPathCard = styled.div`
  position: relative;
  height: 100%;
  border-radius: 0.5rem;
  min-height: 15rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  background: white;
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

const CardContextMenu = styled.div`
  position: absolute;
  background: white;
  border: 1px solid rgba(55, 53, 47, 0.2);
  border-radius: 0.5rem;
  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
  padding: 0.5rem;
`;

const SubMenu = styled.div`
  padding: 0.5rem;
  font-size: 1.5rem;

  border-radius: 0.5rem;
  :hover {
    background: rgba(55, 53, 47, 0.1);
  }
`;
