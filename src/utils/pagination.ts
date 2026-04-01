export const paginationHelper = (query: any) => {
  let page = Number(query.page);
  let limit = Number(query.limit);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  if (limit > 100) limit = 100;

  const skip = (page - 1) * limit;

  return {
    page,
    limit,
    skip,
  };
};