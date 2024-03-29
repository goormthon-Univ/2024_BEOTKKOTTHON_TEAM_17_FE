import styled from "styled-components";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { modCategoryName } from "../utils/axios";
import { useCookies } from "react-cookie";
import ModalDeleteCategory from "../components/ModalDeleteCategory";

const Category = ({ category, fetchCategoryList }) => {
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];
  const [isEdit, setIsEdit] = useState(false);
  const [localContent, setLocalContent] = useState(category);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const intoCategory = () => {
    navigate(`/mycards/category/${category.categoryId}`, { state: { category } });
  };

  const renameCategory = async () => {
    try {
      const res = await modCategoryName(category.categoryId, localContent.categoryName, token);
      toggleIsEdit();
      fetchCategoryList();

      // fetchCategoryList();
    } catch (error) {
      console.error("Error creating category:", error);
      navigate("/");
    }
  };

  const onClose = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <CategoryList>
        <CategoryListLeft>
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18" fill="none">
            <g clip-path="url(#clip0_1_6988)">
              <path
                d="M20.7693 0H3.22945C1.44587 0 0 1.44052 0 3.2175V14.7825C0 16.5595 1.44587 18 3.22945 18H20.7693C22.5529 18 23.9988 16.5595 23.9988 14.7825V3.2175C23.9988 1.44052 22.5529 0 20.7693 0Z"
                fill="#138EFF"
              />
              <path
                d="M19.9714 6.105H24.059C24.3301 6.105 24.5484 6.3225 24.5484 6.5925V11.4075C24.5484 11.6775 24.3301 11.895 24.059 11.895H19.9714C18.368 11.895 17.0657 10.5975 17.0657 9C17.0657 7.4025 18.368 6.105 19.9714 6.105Z"
                fill="#138EFF"
                stroke="white"
                stroke-width="1.2"
                stroke-miterlimit="10"
              />
              <path
                d="M19.6327 9.9375C20.1524 9.9375 20.5737 9.51777 20.5737 9C20.5737 8.48223 20.1524 8.0625 19.6327 8.0625C19.113 8.0625 18.6917 8.48223 18.6917 9C18.6917 9.51777 19.113 9.9375 19.6327 9.9375Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_6988">
                <rect width="25" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {isEdit ? (
            <>
              <Input
                value={localContent.categoryName}
                onChange={(e) => {
                  setLocalContent({ ...localContent, categoryName: e.target.value });
                }}
              />
            </>
          ) : (
            <>
              <CategoryName onClick={intoCategory}>{category.categoryName}</CategoryName>
            </>
          )}
        </CategoryListLeft>
        {isEdit ? (
          <>
            <CategoryListRight>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                cursor="pointer"
                onClick={renameCategory}
              >
                <path d="M1 8.96875L7.5 16L16 1" stroke="#138EFF" stroke-width="2" stroke-linecap="round" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                cursor="pointer"
                style={{ marginLeft: "14px" }}
                onClick={() => setShowDeleteModal(true)}
              >
                <path
                  d="M13.6 5.29825H14.0667C14.5821 5.29825 15 4.91336 15 4.4386V4.00877C15 3.534 14.5821 3.14912 14.0667 3.14912H11.2667M13.6 5.29825V15.614C13.6 16.5636 12.7643 17.3333 11.7333 17.3333H4.26667C3.23573 17.3333 2.4 16.5636 2.4 15.614V5.29825M13.6 5.29825H2.4M11.2667 3.14912V2.7193C11.2667 1.76976 10.431 1 9.4 1H6.6C5.56907 1 4.73333 1.76976 4.73333 2.7193V3.14912M11.2667 3.14912H4.73333M2.4 5.29825H1.93333C1.41787 5.29825 1 4.91336 1 4.4386V4.00877C1 3.534 1.41787 3.14912 1.93333 3.14912H4.73333M6.13333 8.30702V14.3246M9.86667 8.30702V14.3246"
                  stroke="black"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </CategoryListRight>
          </>
        ) : (
          <>
            {" "}
            <CategoryListRight>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                cursor="pointer"
                onClick={toggleIsEdit}
              >
                <path
                  d="M11.2327 2.59385L14.4236 5.74987M14.7619 1.50552L15.4945 2.23817C16.1685 2.91219 16.1685 4.00499 15.4945 4.67901L5.79833 14.3751C5.60887 14.5646 5.3779 14.7073 5.12371 14.7921L1.56868 15.9771C1.23136 16.0896 0.910451 15.7686 1.02289 15.4313L2.2079 11.8763C2.29263 11.6221 2.43538 11.3911 2.62485 11.2016L12.321 1.50551C12.995 0.831496 14.0878 0.831496 14.7619 1.50552Z"
                  stroke="#8C8C8C"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
                <path d="M2.47559 11.0722L5.92746 14.5241" stroke="#8C8C8C" stroke-width="1.2" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                cursor="pointer"
                style={{ marginLeft: "14px" }}
                onClick={() => setShowDeleteModal(true)}
              >
                <path
                  d="M13.6 5.29825H14.0667C14.5821 5.29825 15 4.91336 15 4.4386V4.00877C15 3.534 14.5821 3.14912 14.0667 3.14912H11.2667M13.6 5.29825V15.614C13.6 16.5636 12.7643 17.3333 11.7333 17.3333H4.26667C3.23573 17.3333 2.4 16.5636 2.4 15.614V5.29825M13.6 5.29825H2.4M11.2667 3.14912V2.7193C11.2667 1.76976 10.431 1 9.4 1H6.6C5.56907 1 4.73333 1.76976 4.73333 2.7193V3.14912M11.2667 3.14912H4.73333M2.4 5.29825H1.93333C1.41787 5.29825 1 4.91336 1 4.4386V4.00877C1 3.534 1.41787 3.14912 1.93333 3.14912H4.73333M6.13333 8.30702V14.3246M9.86667 8.30702V14.3246"
                  stroke="black"
                  stroke-width="1.2"
                  stroke-linecap="round"
                />
              </svg>
            </CategoryListRight>
          </>
        )}
      </CategoryList>
      {showDeleteModal && (
        <ModalDeleteCategory
          onClose={onClose}
          categoryToDelete={category.categoryId}
          fetchCategoryList={fetchCategoryList}
        />
      )}
    </>
  );
};

export default Category;

const CategoryList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 26px;
  padding: 0 16px;
`;

const CategoryListLeft = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CategoryListRight = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryName = styled.div`
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  margin-left: 15px;
`;

const Input = styled.input`
  width: calc(100vw - 25px - 17px - 15px - 15px - 30px - 32px);
  border: none;
  outline: none;

  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;

  margin-left: 15px;
  padding-block: 0;
  padding-inline: 0;

  &::placeholder {
    color: #8c8c8c;
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
  }

  @media (hover: hover) and (pointer: fine) {
    width: calc(375px - 25px - 17px - 15px - 15px - 30px - 32px);
  }
`;
