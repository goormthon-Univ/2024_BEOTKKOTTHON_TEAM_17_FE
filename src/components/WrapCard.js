import styled from "styled-components";
import React from "react";

import {
  kakaotalkImg,
  behanceImg,
  blogImg,
  facebookImg,
  githubImg,
  instagramImg,
  linkedInImg,
  notefolioImg,
  tiktokImg,
  xImg,
  youtubeImg,
  contentImg,
  linkImg,
  organizationImg,
  phoneImg,
  mailImg,
} from "../utils/snsImg";

const iconMapping = {
  instagram: instagramImg,
  youtube: youtubeImg,
  facebook: facebookImg,
  linkedIn: linkedInImg,
  organization: organizationImg,
  link: linkImg,
  content: contentImg,
  x: xImg,
  tiktok: tiktokImg,
  naver: blogImg,
  notefolio: notefolioImg,
  behance: behanceImg,
  github: githubImg,
  kakao: kakaotalkImg,
};

const WrapCard = ({ userData, customTextColor }) => {
  // 'organization', 'content', 'link' 중 하나 선택
  const primaryInfoKey = userData.status !== null;
  // 나머지 정보 중 최대 3개 선택
  const secondaryInfoKeys = [
    "organization",
    "instagram",
    "youtube",
    "facebook",
    "x",
    "tiktok",
    "naver",
    "linkedIn",
    "notefolio",
    "behance",
    "github",
    "kakao",
    "content",
    "link",
  ];

  const secondaryInfos = secondaryInfoKeys
    .map((key) => ({ key, value: userData[key] }))
    .filter((info) => info.value !== null)
    .slice(0, 4);

  const formatPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else {
      return ""; // 또는 다른 기본값으로 설정
    }
  };

  const formatNameWithSpace = (name) => {
    if (!name) return "";
    return name.split("").join(" ");
  };

  return (
    <CardBox
      bgColor={userData.bgColor}
      textColor={customTextColor}
    >
      <CardBoxIn>
        <CardLeftRight>
          <CardNameSpace style={{ marginRight: "7px" }}>
            <CardName>{formatNameWithSpace(userData.name)}</CardName>
            {primaryInfoKey && <CardText style={{ marginRight: "7px" }}>{userData.status}</CardText>}
          </CardNameSpace>

          <CardRight>
            <CardSpace style={{ marginTop: "0" }}>
              <Logo src={mailImg} />
              <CardText>{userData.email}</CardText>
            </CardSpace>
            <CardContents>
              <CardSpace>
                <Logo src={phoneImg} />
                <CardText>{formatPhoneNumber(userData.phone)}</CardText>
              </CardSpace>

              {secondaryInfos.map((info) => (
                <CardSpace key={info.key}>
                  <Logo src={iconMapping[info.key]} />
                  <CardText>{info.value}</CardText>
                </CardSpace>
              ))}
            </CardContents>
          </CardRight>
        </CardLeftRight>
      </CardBoxIn>
    </CardBox>
  );
};

export default React.memo(WrapCard);

const CardBox = styled.div`
  width: calc(100vw - 32px);
  max-width: 580px;
  height: 200px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  color: ${(props) => props.textColor || "#000"};
  box-shadow: 0 0 5px 0 #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (hover: hover) and (pointer: fine) {
    width: 343px;
    height: 200px;
  }

  position: relative;
`;

const CardBoxIn = styled.div`
  width: calc(100% - 32px);
  height: calc(100% - 24px);

  display: flex;
  flex-direction: column;
`;

const CardName = styled.div`
  font-family: Pretendard;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const CardText = styled.div`
  font-family: Pretendard;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 7px;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100vw - 120px - 32px - 32px);

  @media (hover: hover) and (pointer: fine) {
    max-width: calc(375px - 120px - 32px - 32px);
  }
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardNameSpace = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardSpace = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const CardLeftRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const CardRight = styled.div`
  margin-left: 18px;
`;

const Logo = styled.img`
  width: 12px;
  height: auto;
`;
