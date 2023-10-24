import styled from '@emotion/styled';

export const LibraryReviewContainer = styled.div`
  p {
    padding: 0 0 0 20px;
    color: #b9b19c;
    font-weight: bold;
  }
`;

export const LibraryReviewGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  justify-items: center;
  padding: 0 20px;
  p {
    color: #b9b19c;
    font-weight: bold;
  }
`;
export const LibraryReview = styled.div`
  width: 350px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 36px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.06) 2px 2px 20px, rgba(0, 0, 0, 0.04) 2px 2px 10px;
`;
export const BookImage = styled.img`
  width: 120px;
  height: 180px;
  border-radius: 1px 8px 8px 1px;
  box-shadow: 8px 0px 8px -5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
`;
export const BookTitle = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin: 16px 0 2px 0;
`;
export const BookAuthor = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  margin-bottom: 9px;
`;

export const ReviewPhraseContainer = styled.div`
  width: 300px;
  height: auto;
  display: flex;
  align-items: start;
  justify-content: center;
  text-align: center;
  p {
    display: flex;
    align-items: start;
    padding: 0;
    margin: 0 20px;
    font-size: 24px;
    color: #503f15;
  }
`;

export const ReviewPhrase = styled.div`
  height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: start;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  padding-top: 3px;
`;

export const ReviewDeleteNEdit = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding: 12px 0;
  border-top: 1px solid #b9b19c9a;
  p {
    margin: 0 40px;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const NoReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  p {
    text-align: center;
  }
`;
