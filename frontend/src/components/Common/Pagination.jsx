import { Container, Pagination } from "react-bootstrap";

function CustomPagination({
  pageSize,
  currentPageNo,
  lastPageNo,
  setPageInfo,
}) {
  const range = Math.ceil(currentPageNo / pageSize);
  const startNo = (range - 1) * pageSize + 1;
  let endNo = range * pageSize;
  if (endNo > lastPageNo) {
    endNo = lastPageNo;
  }

  const handlePageBtnClick = (n) => {
    setPageInfo((prev) => ({
      ...prev,
      pageNo: n,
    }));
  };

  const handleArrowBtnClick = (n) => {
    let newPageNo = currentPageNo;
    newPageNo += n;

    setPageInfo((prev) => ({
      ...prev,
      pageNo: newPageNo,
    }));
  };

  const paging = () => {
    const result = [];
    for (let i = startNo; i <= endNo; i++) {
      if (i === currentPageNo) {
        result.push(<Pagination.Item active key={i} children={i} />);
      } else {
        result.push(
          <Pagination.Item
            onClick={() => {
              handlePageBtnClick(i);
            }}
            key={i}
            children={i}
          />
        );
      }
    }
    return result;
  };

  return (
    <Container>
      <Pagination className="justify-content-center px-4">
        <Pagination.Prev
          aria-hidden
          children="◀"
          disabled={currentPageNo === 1}
          onClick={() => {
            handleArrowBtnClick(-1);
          }}
        />
        {paging()}

        <Pagination.Next
          aria-hidden
          children="▶"
          disabled={currentPageNo === lastPageNo}
          onClick={() => {
            handleArrowBtnClick(1);
          }}
        />
      </Pagination>
    </Container>
  );
}

export default CustomPagination;
