import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navigator from "./components/common/navigator/Navigator";
import PathWrite from "./pages/PathWrite";
import styled from "@emotion/styled";
import SideBar from "./components/common/sidebar/SideBar";
import { useState } from "react";

const mobileReg = /Mobi|Android/i;

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  console.log(navigator.userAgent);
  console.log(mobileReg.test(navigator.userAgent));

  return (
    <PageWrapper>
      <SideBar isSideBarOpen={isSideBarOpen} />
      <ContentWarpper isSideBarOpen={isSideBarOpen}>
        <Navigator setIsSideBarOpen={setIsSideBarOpen} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/write/:pathId" element={<PathWrite />} />
        </Routes>
      </ContentWarpper>
    </PageWrapper>
  );
}

export default App;

const PageWrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  min-width: 32rem;
  background-color: #ededed;
`;
const ContentWarpper = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  border-radius: 5rem 0 0 5rem;
`;
