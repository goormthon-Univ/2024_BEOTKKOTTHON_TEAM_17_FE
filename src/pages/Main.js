import React from "react";

import styled from "styled-components";

const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const MainPage = styled.div`
  background: linear-gradient(#138eff, #006eee);

  width: 100vw;
  min-height: 100vh;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
`;

function Main() {
  return (
    <Page>
      <FlexCenter>
        <MainPage>
          <p>메인페이지</p>
        </MainPage>
      </FlexCenter>
    </Page>
  );
}

export default Main;
