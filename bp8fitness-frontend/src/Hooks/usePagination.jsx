import { useState } from 'react';

const usePagination = (initialResultsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(initialResultsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleResultsPerPageChange = (newResultsPerPage) => {
    setResultsPerPage(newResultsPerPage);
    setCurrentPage(1);
  };

  const getPaginatedData = (data) => {
    const start = (currentPage - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    return data.slice(start, end);
  };

  const getTotalPages = (totalData) => {
    return Math.ceil(totalData.length / resultsPerPage);
  };

  return {
    currentPage,
    resultsPerPage,
    handlePageChange,
    handleResultsPerPageChange,
    getPaginatedData,
    getTotalPages,
  };
};

export default usePagination;
