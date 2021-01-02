
exports.build = (payload) => {
    return {
      totalDocs: payload && payload.totalDocs,
      limit: payload && payload.limit,
      offset: payload && payload.offset,
      hasPrevPage: payload && payload.hasPrevPage,
      hasNextPage: payload && payload.hasNextPage,
      page: payload && payload.page,
      totalPages: payload && payload.totalPages,
      pagingCounter: payload && payload.pagingCounter,
      prevPage: payload && payload.prevPage,
      nextPage: payload && payload.nextPage
    };
}
