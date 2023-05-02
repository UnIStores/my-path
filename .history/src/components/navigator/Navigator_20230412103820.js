import React from "react";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as LeftArrow } from "../../images/left-arrow.svg";

const NavigatorWrapper = styled.div`
  width: 100%;
  background-color: #fde1a3;
  display: flex;
  z-index: 998;
`;
const NavigatorSpan = styled.div`
  font-weight: 600;
  font-size: 3rem;
  flex: 1;
  padding: 2rem 1rem 2rem 1rem;
`;

const BackButton = styled(LeftArrow)`
  width: 3rem;
  height: 100%;
  fill: white;
  padding-left: 1rem;
  cursor: pointer;
`;

const Navigator = () => {
  const nav = useNavigate();
  const location = useLocation();

  console.log(location);
  return (
    <NavigatorWrapper
      onClick={() => {
        nav(-1);
      }}
    >
      <BackButton />
      <NavigatorSpan>My Path</NavigatorSpan>
    </NavigatorWrapper>
  );
};

export default Navigator;
