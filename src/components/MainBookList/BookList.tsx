import { useState } from 'react';
import * as S from './BookList.styles';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { SearchBar } from '../SearchBar/SearchBar';
import { BookFilter } from '../Filter/BookFilter';
import { CategoryFilter } from '../CategoryFilter/CategoryFilter';
import IconReviewer from '../../assets/svg/person.svg';
import IconRating from '../../assets/svg/fullStar.svg';
import { useGetBookList } from '../../querys/bookQuery';

export type Book = {
  bookId: number;
  thumbnail: string;
  title: string;
  author: string;
  reviewCount: number;
  avgRating: number;
};

export type CategoryType = {
  categoryId: number;
  categoryName: string;
};

export type FilterType = {
  filterId: number;
  filterName: string;
  sortName: string;
};

const category: CategoryType[] = [
  { categoryId: 0, categoryName: 'All' },
  { categoryId: 1, categoryName: '로맨스' },
  { categoryId: 2, categoryName: '추리' },
  { categoryId: 3, categoryName: '에세이' },
  { categoryId: 4, categoryName: '고전' },
  { categoryId: 5, categoryName: '수필' },
  { categoryId: 6, categoryName: 'SF' },
  { categoryId: 7, categoryName: '무협' },
  { categoryId: 8, categoryName: '시' },
  { categoryId: 9, categoryName: '판타지' },
  { categoryId: 10, categoryName: '공포' },
];

export const bookFilter: FilterType[] = [
  { filterId: 0, filterName: '최신순', sortName: 'CREATED_AT' },
  { filterId: 1, filterName: 'ㄱㄴㄷ', sortName: 'TITLE_ASC' },
  { filterId: 2, filterName: '별점순', sortName: 'RATING_DESC' },
  { filterId: 3, filterName: '리뷰 많은 순', sortName: 'COUNT_REVIEW' },
];

export function BookList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<number>(0);
  const [searchBook, setSearchBook] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const navigate = useNavigate();

  const { data: books } = useGetBookList({ currentPage, sortOption, searchBook, selectedCategory });

  return (
    books && (
      <>
        <S.Search>
          <CategoryFilter
            category={category}
            onSelect={(categoryId: number) => setSelectedCategory(categoryId)}
          />
          <S.SearchNFilter>
            <SearchBar onSearch={setSearchBook} />
            <BookFilter
              filter={bookFilter}
              onSelect={(filterId: number) => setSortOption(filterId)}
            />
          </S.SearchNFilter>
        </S.Search>
        <S.BookListContainer>
          {books.contents.map((book) => (
            <S.BookListItems
              key={book.bookId}
              onClick={() => {
                navigate(`books/${book.bookId}`);
              }}
            >
              <S.BookImage src={book.thumbnail} />
              <S.BookTitle>{book.title}</S.BookTitle>
              <S.BookAuthor>{book.author}</S.BookAuthor>
              <S.ReviewerContainer>
                <S.ReviewerIcon src={IconReviewer} />
                <S.Reviewer>{book.reviewCount}</S.Reviewer>
                <S.RatingIcon src={IconRating} />
                <S.RatingPoint>{book.avgRating}</S.RatingPoint>
              </S.ReviewerContainer>
            </S.BookListItems>
          ))}
        </S.BookListContainer>
        <S.PaginationWrapper>
          <div className="pagination">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={40}
              totalItemsCount={books.totalElements}
              pageRangeDisplayed={5}
              onChange={() => setCurrentPage(currentPage)}
              prevPageText={'‹'}
              nextPageText={'›'}
            />
          </div>
        </S.PaginationWrapper>
      </>
    )
  );
}
