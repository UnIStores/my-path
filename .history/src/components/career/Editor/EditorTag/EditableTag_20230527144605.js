import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRef } from "react";

const EditableTag = ({ updateElement, data, overlayWidth, movementSide }) => {
  const [html, setHtml] = useState(data?.html);
  const [editPlaceHolder, setEditPlaceHolder] = useState(null);
  const [isHover, setIsHover] = useState(false);
  const editRef = useRef(null);
  return (
    <EditableContainer>
      <Editable
        styleData={data?.styleData}
        ref={editRef}
        className="editable-tag"
        contentEditable={true}
        suppressContentEditableWarning={true}
        onDragStart={(e) => {
          e.preventDefault();
        }}
        placeholder={editPlaceHolder}
        onFocus={() => {
          setEditPlaceHolder("내용을 입력하세요");
        }}
        onBlur={() => {
          setEditPlaceHolder(null);
        }}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        onInput={(e) => {
          console.log("aa");
          const childNodes = Array.from(e.target.childNodes);
          let newHtml = "";

          if (childNodes.length > 1) {
            for (let i = 0; i < childNodes.length; i++) {
              if (childNodes[i]?.nodeName === "SPAN") {
                newHtml += childNodes[i].outerHTML;
              } else {
                newHtml += childNodes[i].textContent;
              }

              if (
                childNodes[i]?.nodeName === "SPAN" ||
                childNodes[i]?.nodeName === "B"
              ) {
                childNodes[i] = childNodes[i].firstChild;
              }
            }

            const range = window.getSelection().getRangeAt(0);

            const startIndex = childNodes.indexOf(range.startContainer);
            const startOffset = range.startOffset;

            const target = document.querySelector(`[uuid="${data.uuid}"]`);
            const editableTag = target.querySelector(".editable-tag");
            editableTag.innerHTML = newHtml;
            const newChildeList = Array.from(editableTag.childNodes).map(
              (node) => {
                if (node.nodeName === "SPAN") {
                  node = node.firstChild;
                }
                return node;
              }
            );

            const newRange = document.createRange();
            newRange.setStart(newChildeList[startIndex], startOffset);
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(newRange);

            updateElement(data.uuid, {
              html: newHtml,
            });
          } else {
            updateElement(data.uuid, {
              html: e.target.innerHTML,
            });
          }
        }}
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning={true}
      />
      {isHover ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            pointerEvents: "none",
            background: "rgba(55, 53, 47, 0.1)",
          }}
        ></div>
      ) : null}

      {style ? <div style={style}></div> : null}
    </EditableContainer>
  );
};

export default EditableTag;

const EditableContainer = styled.div`
  position: relative;
  width: ${(props) => props?.overlayWidth + "%"};
`;

const Editable = styled.div`
  position: relative;
  outline: none;
  display: flex;
  word-break: break-all;

  justify-content: ${(props) =>
    props?.styleData?.textAlign ? props?.styleData?.textAlign : null};
  font-size: ${(props) =>
    props?.styleData?.fontSize ? props?.styleData?.fontSize + "px" : "16px"};
  background: ${(props) =>
    props?.styleData?.background ? props?.styleData?.background : null};
`;
