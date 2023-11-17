import { useState } from 'react';
import * as S from './BookFilter.styles';
import { FilterType } from '../MainBookList/BookList';

type FilterProps = {
  filter: FilterType[];
  onSelect: (filterId: number, filterName: string) => void;
  filterName: string;
};
//렌더링 원치 않으면 setState 상위 컴포넌트에서 관리
export function BookFilter({ filter, onSelect, filterName }: FilterProps) {
  const [openCategory, setOpenCategory] = useState<boolean>(false);

  return (
    <>
      <S.Filter>
        <p
          onClick={() => {
            setOpenCategory(!openCategory);
          }}
        >
          {filterName}
          <img src={openCategory ? 'src/assets/svg/arrowUp.svg' : 'src/assets/svg/arrowDown.svg'} />
        </p>
        {openCategory && (
          <S.FilterList>
            {filter.map((option) => (
              <li
                key={option.filterId}
                onClick={() => {
                  setOpenCategory(false);
                  onSelect(option.filterId, option.filterName);
                }}
                style={{
                  fontWeight: option.filterName === filterName ? 'bold' : 'normal',
                }}
              >
                {option.filterName}
              </li>
            ))}
          </S.FilterList>
        )}
      </S.Filter>
    </>
  );
}
