import React from "react";
import styled from "@emotion/styled";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const SubContextMenu = ({
  popupData,
  changeTextAlignment,
  changeMenu,
  deleteMenu,
  handleLinkClick,
}) => {
  const [menuPoint, setMenuPoint] = useState({ x: 0, y: 0 });
  const [selectMenu, setSelectMenu] = useState(null);
  const selectRef = useRef(null);
  const subMenuRef = useRef(null);
  console.log("popupData?.styleData : ", popupData?.style);

  const menuList = [
    { menuText: "삭제", onClick: deleteMenu },
    { menuText: "변경", onClick: changeMenu },
    {
      menuText: "정렬",
      subMenuList: [
        {
          text: "왼쪽",
          isSelect: popupData?.style?.textAlign === "start",
          event: () => {
            changeTextAlignment("start");
          },
        },
        {
          text: "가운데",
          isSelect: popupData?.style?.textAlign === "center",
          event: () => {
            changeTextAlignment("center");
          },
        },
        {
          text: "오른쪽",
          isSelect: popupData?.style?.textAlign === "end",
          event: () => {
            changeTextAlignment("end");
          },
        },
      ],
    },
    { menuText: "링크", onClick: handleLinkClick },
  ];

  useEffect(() => {
    const selectMenu = selectRef.current;
    const subMenuPopup = subMenuRef.current;
    if (selectMenu && subMenuPopup) {
      const selectMenuRect = selectMenu.getBoundingClientRect();
      const subMenuRect = subMenuPopup.getBoundingClientRect();
      const pointX = selectMenuRect.right + subMenuRect.width;
      const pointY = selectMenuRect.top + subMenuRect.height;

      const selectMenuRight = selectMenu.offsetLeft + selectMenu.offsetWidth;
      const selectMenuTop = selectMenu.offsetTop;

      const point = {
        x:
          pointX > window.innerWidth
            ? selectMenuRight - subMenuRect.width
            : selectMenuRight,
        y:
          pointY > window.innerHeight
            ? selectMenuTop - subMenuRect.height
            : selectMenuTop,
      };
      setMenuPoint(point);
    }
  }, [selectMenu]);

  return (
    <SubContextWarpper
      onMouseLeave={(e) => {
        selectRef.current = null;
        setSelectMenu(null);
      }}
    >
      {menuList.map((item) => (
        <SubContextMenuWrapper
          key={item.menuText}
          isSelect={selectMenu?.menuText === item?.menuText}
          onClick={item.onClick}
          onMouseEnter={(e) => {
            selectRef.current = e.currentTarget;
            setSelectMenu(item);
          }}
        >
          {item.menuText}
          {item?.subMenuList && <SubMenuArrow>&gt;</SubMenuArrow>}
        </SubContextMenuWrapper>
      ))}
      {selectMenu?.subMenuList && (
        <SubMenuWrapper menuPoint={menuPoint} ref={subMenuRef}>
          {selectMenu.subMenuList?.map((menu) => (
            <SubMenuButton
              key={menu.text}
              onClick={menu.event}
              isSelect={menu.isSelect}
            >
              {menu.text}
            </SubMenuButton>
          ))}
        </SubMenuWrapper>
      )}
    </SubContextWarpper>
  );
};

export default SubContextMenu;

const SubContextWarpper = styled.div`
  position: relative;
  padding: 0.5rem;
`;

const SubContextMenuWrapper = styled.div`
  position: relative;
  font-size: 1.7rem;
  line-height: 2.8rem;
  padding-left: 0.5rem;
  border-radius: 0.5rem;
  background: ${(props) => (props.isSelect ? "rgba(55, 53, 47, 0.1)" : "")};
`;

const SubMenuArrow = styled.span`
  float: right;
  padding-right: 1rem;
`;

const SubMenuButton = styled.div`
  padding: 0.5rem;
  border-radius: ${(props) => (props.isSelect ? "0.3rem" : null)};
  outline: ${(props) =>
    props.isSelect ? "1px solid rgba(55, 53, 47, 0.1)" : null};
  :hover {
    background: rgba(55, 53, 47, 0.1);
    border-radius: 0.3rem;
  }
`;

const SubMenuWrapper = styled.div`
  position: absolute;
  padding: 0.5rem;
  left: ${(props) => `${props.menuPoint.x}px`};
  top: ${(props) => `${props.menuPoint.y}px`};
  background: white;
  border: 1px solid rgba(55, 53, 47, 0.2);
  border-radius: 0.5rem;
  z-index: 999;
`;
