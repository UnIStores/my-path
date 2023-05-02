import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const NavigatorWrapper = styled.div`
  width: 100%;
  background-color: #fde1a3;
  display: flex;
  z-index: 998;
`;
const NavigatorSpan = styled.div`
  font-weight: 600;
  font-size: 3rem;
  padding: 2rem 1rem 2rem 1rem;
`;

const BackButton = styled.div`
  width: 5rem;
  height: 100%;
  text-align: center;
  font-size: 5rem;
  color: white;
  ::before {
    cursor: pointer;
    content: "<";
  }
`;

const Navigator = () => {
  const nav = useNavigate();
  return (
    <NavigatorWrapper
      onClick={() => {
        console.log("?");
        nav("/");
      }}
    >
      <BackButton></BackButton>
      <NavigatorSpan>My Path</NavigatorSpan>
    </NavigatorWrapper>
  );
};

export default Navigator;
