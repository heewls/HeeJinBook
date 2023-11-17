import * as S from './LibraryList.styles';
import { useNavigate } from 'react-router-dom';
import IconX from '../../../assets/svg/circleX.svg';
import { useGetLibraryBook } from '../../../querys/bookQuery';
import { useDeleteBook } from '../../../querys/bookMutation';

export type LibraryBookType = {
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  bookThumbnail: string;
};

export function LibraryList() {
  const navigate = useNavigate();

  const { data: libraryBook } = useGetLibraryBook();

  const { deleteBookMutate } = useDeleteBook();

  return (
    libraryBook && (
      <S.LibraryListContainer>
        <p>전체 {libraryBook.length}</p>
        <S.LibraryList>
          {libraryBook
            .map((book) => (
              <S.LibraryListItems key={book.bookId}>
                <div style={{ position: 'relative' }}>
                  <S.LibraryDelete src={IconX} onClick={() => deleteBookMutate(book.bookId)} />
                  <div
                    onClick={() => {
                      navigate(`/main/books/${book.bookId}`);
                    }}
                  >
                    <S.LibraryImage src={book.bookThumbnail} />
                  </div>
                  <S.LibraryTitle>{book.bookTitle}</S.LibraryTitle>
                  <S.LibraryAuthor>{book.bookAuthor}</S.LibraryAuthor>
                </div>
              </S.LibraryListItems>
            ))
            .reverse()}
        </S.LibraryList>
      </S.LibraryListContainer>
    )
  );
}
