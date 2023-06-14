import React, { useState } from "react";
import styled from "@emotion/styled";
import { useRef } from "react";

const EditableComponent = ({ updateElement, data }) => {
  const [html, setHtml] = useState(data?.html);
  const [editPlaceHolder, setEditPlaceHolder] = useState(null);
  const editRef = useRef(null);
  console.log("data: ", data);

  const handleInput = (e) => {
    const childNodes = Array.from(e.target.childNodes);
    let newHtml = "";
    if (childNodes.length > 1) {
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i] instanceof Text) {
          newHtml += childNodes[i].textContent;
        } else {
          newHtml += childNodes[i].outerHTML;
        }

        while (childNodes[i] instanceof Text === false) {
          childNodes[i] = childNodes[i].firstChild;
        }
      }

      const range = window.getSelection().getRangeAt(0);
      const startIndex = childNodes.indexOf(range.startContainer);
      const startOffset = range.startOffset;

      //const target = document.querySelector(`[data-uuid="${data.uuid}"]`);
      //const editableTag = target.querySelector("[name=editable-tag]");

      // const newChildeList = Array.from(editableTag.childNodes).map((node) => {
      //   if (node.nodeName === "SPAN") {
      //     node = node.firstChild;
      //   }
      //   return node;
      // });
      const newRange = document.createRange();
      newRange.setStart(childNodes[startIndex], startOffset);
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
  };

  const handleClick = (e) => {
    const isAnchorElement = e.target.closest("a");

    if (isAnchorElement) {
      const href = isAnchorElement.getAttribute("href");
      if (href) {
        window.open(href, "_blank");
      }
    }
  };

  return (
    <Editable
      styleData={data?.styleData}
      ref={editRef}
      name="editable-tag"
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
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
        }
      }}
      onInput={handleInput}
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning={true}
    />
  );
};

export default EditableComponent;

const Editable = styled.div`
  position: relative;
  outline: none;
  word-break: break-all;
  white-space: pre-wrap;
  padding: 0 0.2rem;

  color: ${(props) => (props?.style?.color ? props?.style?.color : null)};
  background: ${(props) =>
    props?.style?.background ? props?.style?.background : null};
  text-align: ${(props) =>
    props?.style?.textAlign ? props?.style?.textAlign : null};
  font-size: ${(props) =>
    props?.style?.fontSize ? props?.style?.fontSize + "px" : "1.6rem"};
`;
