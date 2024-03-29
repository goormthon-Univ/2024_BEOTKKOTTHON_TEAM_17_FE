import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import BackQRHeader from "../components/BackQRHeader";
import { getListCategoryInfo, getSearchCategoryInfo } from "../utils/axios";
import { useCookies } from "react-cookie";
import { useOtherCategoryInfo } from "../store/store";
import Card from "../components/Card";
import ModalCategoryCard from "../components/ModalCategoryCard";
import ModalDelete from "../components/ModalDelete";
import ModalCategoryCardDelete from "../components/ModalCategoryCardDelete";
import Search from "../images/search3.png";
import AddCardModal from "../components/AddCardModal";
import Loading from "../components/Loading";

const MyCardsCategoryCard = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState("");
  const [searchedCategoryInfo, setSearchedCategoryInfo] = useState([]);
  const [isModalCategoryCardOpen, setIsModalCategoryCardOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isModalCategoryDeleteOpen, setIsModalCategoryDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const { otherCategoryInfo, setOtherCategoryInfo } = useOtherCategoryInfo();
  const [isAddCardModal, setIsAddCardModal] = useState(false);
  const location = useLocation();
  const category = location.state.category;

  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    setSearchData(e.target.value);
    handleSearch();
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  const handleSearch = async () => {
    if (searchData.trim() !== "") {
      try {
        if (!token) {
          navigate("/");
          return;
        }
        const searchRes = await getSearchCategoryInfo(token, category.categoryId, searchData);
        if (searchRes && searchRes.status === 200) {
          setSearchedCategoryInfo(searchRes.data); // 검색 결과를 상태에 저장
        }
      } catch (error) {
        console.log(error);
        // 오류 처리
      }
    }
  };

  const handleCategoryCardClick = (user) => {
    setSelectedUser(user);
    setIsModalCategoryCardOpen(true);
  };

  const closeCategoryModal = () => {
    setIsModalCategoryCardOpen(false);
    setIsModalDeleteOpen(false);
    setIsModalCategoryDeleteOpen(false);
  };

  const handleAddCardModal = () => {
    setIsAddCardModal(true);
  };

  const closeAddCardModal = () => {
    setIsAddCardModal(false);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (!token) {
          navigate("/");
        }
        const otherCategoryInfoResponse = await getListCategoryInfo(token, category.categoryId);
        if (otherCategoryInfoResponse && otherCategoryInfoResponse.status === 200) {
          setOtherCategoryInfo(otherCategoryInfoResponse.data);
        }
      } catch (error) {
        console.log(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="page">
      <div className="center">
        <MyCardsCategoryCardPage>
          <div className="page-space">
            <BackQRHeader redirectTo={"/mycards"} />
            <CategoryTitle>{category.categoryName}</CategoryTitle>
            <MyCardsSearch>
              <img
                src={Search}
                alt="검색"
                style={{ height: "20px", marginLeft: "16px", cursor: "pointer" }}
                onClick={handleSearch}
              />
              <MyCardsSearchInput
                type="text"
                value={searchData}
                onChange={handleInputChange}
                onKeyPress={handleOnKeyPress}
                placeholder="이름, 이메일 등으로 검색해보세요"
              />
            </MyCardsSearch>
            {searchData.trim() === "" ? (
              /* 검색하지 않았을 때는 전체 리스트를 보여줌 */
              <>
                {Array.isArray(otherCategoryInfo) && otherCategoryInfo.length === 0 ? (
                  /* 전체 리스트가 없을 때는 등록된 명함이 없다는 메시지 표시 */
                  <NoneCategoryCards onClick={handleAddCardModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      style={{ cursor: "pointer" }}
                    >
                      <path
                        d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                        fill="url(#paint0_linear_205_7625)"
                      />
                      <path
                        d="M33 20V46"
                        stroke="white"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M46 33L20 33"
                        stroke="white"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_205_7625"
                          x1="32"
                          y1="-31"
                          x2="32"
                          y2="82"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset="0.0475677"
                            stop-color="#92CBFF"
                          />
                          <stop
                            offset="0.462568"
                            stop-color="#0587FF"
                          />
                          <stop
                            offset="0.752212"
                            stop-color="#0076FF"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                    <p style={{ marginTop: "17px" }}>명함 추가하기</p>
                  </NoneCategoryCards>
                ) : (
                  /* 전체 리스트가 있을 때는 해당 리스트를 표시 */
                  <div className="card-list-btn">
                    <CardLists>
                      {Array.isArray(otherCategoryInfo) &&
                        otherCategoryInfo.map((user, index) => (
                          <CardListsCard
                            key={index}
                            onClick={() => handleCategoryCardClick(user)}
                          >
                            <Card userData={user} />
                          </CardListsCard>
                        ))}
                    </CardLists>
                    <PlusBtn onClick={handleAddCardModal}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="65"
                        height="65"
                        viewBox="0 0 65 65"
                        fill="none"
                      >
                        <path
                          d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                          fill="url(#paint0_linear_51_3214)"
                        />
                        <path
                          d="M33 20V46"
                          stroke="white"
                          stroke-width="2.5"
                          stroke-linecap="round"
                        />
                        <path
                          d="M46 33L20 33"
                          stroke="white"
                          stroke-width="2.5"
                          stroke-linecap="round"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_51_3214"
                            x1="32"
                            y1="-31"
                            x2="32"
                            y2="82"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop
                              offset="0.0475677"
                              stop-color="#92CBFF"
                            />
                            <stop
                              offset="0.462568"
                              stop-color="#0587FF"
                            />
                            <stop
                              offset="0.752212"
                              stop-color="#0076FF"
                            />
                          </linearGradient>
                        </defs>
                      </svg>
                    </PlusBtn>
                  </div>
                )}
              </>
            ) : (
              /* 검색한 경우에는 검색 결과를 표시 */
              <>
                <div className="card-list-btn">
                  {Array.isArray(searchedCategoryInfo) && searchedCategoryInfo.length === 0 ? (
                    /* 검색 결과가 없을 때는 검색 결과가 없다는 메시지 표시 */
                    <NoneCards>
                      <p style={{ marginTop: "50px" }}>검색된 명함이 없어요.</p>
                    </NoneCards>
                  ) : (
                    /* 검색 결과가 있을 때는 해당 결과를 표시 */
                    <CardLists>
                      {Array.isArray(searchedCategoryInfo) &&
                        searchedCategoryInfo.map((user, index) => (
                          <CardListsCard
                            key={index}
                            onClick={() => handleCategoryCardClick(user)}
                          >
                            <Card userData={user} />
                          </CardListsCard>
                        ))}
                    </CardLists>
                  )}
                  <PlusBtn onClick={handleAddCardModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                    >
                      <path
                        d="M65 32.5C65 50.4493 50.4493 65 32.5 65C14.5507 65 0 50.4493 0 32.5C0 14.5507 14.5507 0 32.5 0C50.4493 0 65 14.5507 65 32.5Z"
                        fill="url(#paint0_linear_51_3214)"
                      />
                      <path
                        d="M33 20V46"
                        stroke="white"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      />
                      <path
                        d="M46 33L20 33"
                        stroke="white"
                        stroke-width="2.5"
                        stroke-linecap="round"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_51_3214"
                          x1="32"
                          y1="-31"
                          x2="32"
                          y2="82"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop
                            offset="0.0475677"
                            stop-color="#92CBFF"
                          />
                          <stop
                            offset="0.462568"
                            stop-color="#0587FF"
                          />
                          <stop
                            offset="0.752212"
                            stop-color="#0076FF"
                          />
                        </linearGradient>
                      </defs>
                    </svg>
                  </PlusBtn>
                </div>
              </>
            )}
            {isModalCategoryCardOpen && (
              <ModalCategoryCard
                user={selectedUser}
                onClose={closeCategoryModal}
                onOpenDeleteModal={() => {
                  setIsModalDeleteOpen(true);
                }}
                onOpenCategoryDeleteModal={() => {
                  setIsModalCategoryDeleteOpen(true);
                }}
              />
            )}
            {isModalDeleteOpen && (
              <ModalDelete
                user={selectedUser}
                onClose={closeCategoryModal}
              />
            )}
            {isModalCategoryDeleteOpen && (
              <ModalCategoryCardDelete
                category={category}
                user={selectedUser}
                onClose={closeCategoryModal}
              />
            )}
            {isAddCardModal && (
              <AddCardModal
                onClose={closeAddCardModal}
                token={token}
              />
            )}
          </div>
        </MyCardsCategoryCardPage>
      </div>
    </div>
  );
};

export default MyCardsCategoryCard;

const MyCardsCategoryCardPage = styled.div`
  background: #fff;
`;

const CategoryTitle = styled.div`
  font-family: Pretendard;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;

  margin-top: 15px;
  margin-left: 16px;
`;

const MyCardsSearch = styled.div`
  width: 100vw;
  height: 37px;
  border-top: 1px solid #8c8c8c;
  border-bottom: 1px solid #8c8c8c;

  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;

  display: flex;
  align-items: center;
  margin-top: 20px;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const MyCardsSearchInput = styled.input`
  width: calc(100vw - 16px - 20px - 13px - 16px);
  border: none;
  outline: none;

  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;

  margin-left: 13px;

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 16px - 20px - 13px - 16px);
  }
`;

const NoneCategoryCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  margin-top: 200px;
`;

const NoneCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: Pretendard;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;

  margin-top: 100px;
`;

const CardLists = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 27px;

  @media (hover: hover) and (pointer: fine) {
    width: 375px;
  }
`;

const CardListsCard = styled.div`
  margin-top: 27px;
  width: calc(100vw - 32px);
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 32px);
  }
`;

const PlusBtn = styled.div`
  position: fixed;
  bottom: 33px;
  right: 20px;
  cursor: pointer;

  @media (hover: hover) and (pointer: fine) {
    right: calc(50vw - 187.5px + 20px);
  }
`;
