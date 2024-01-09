import { DEFAULT_PER_PAGE } from '../consts';
import { BasePaginationResponse } from '../dtos/base-pagination.dto';

export const calcSkipPaginate = (page = 1, perPage = DEFAULT_PER_PAGE) =>
  (page - 1) * perPage;

export const createPaginateResponse = <T>({
  data,
  total,
  page,
  perPage,
}: {
  data: T[];
  total: number;
  page: number;
  perPage: number;
}): BasePaginationResponse<T> => {
  const totalPages = Math.floor(total / perPage);

  return {
    data,
    meta: {
      perPage,
      page,
      totalPages,
      total,
    },
  };
};
