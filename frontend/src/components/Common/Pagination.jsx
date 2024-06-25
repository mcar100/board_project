import { Container, Pagination } from "react-bootstrap";

function CustomPagination({ pageInfo, setPageNo }) {
  const { pageSize, pageNo, lastPageNo } = pageInfo;
  const range = Math.ceil(pageNo / pageSize);
  const startNo = (range - 1) * pageSize + 1;
  let endNo = range * pageSize;
  if (endNo > lastPageNo) {
    endNo = lastPageNo;
  }

  const handlePageBtnClick = (n) => {
    setPageNo(n);
  };

  const handleArrowBtnClick = (n) => {
    let newPageNo = pageNo;
    newPageNo += n;

    setPageNo(newPageNo);
  };

  const paging = () => {
    const result = [];
    for (let i = startNo; i <= endNo; i++) {
      if (i === pageNo) {
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
          disabled={pageNo === 1}
          onClick={() => {
            handleArrowBtnClick(-1);
          }}
        />
        {paging()}

        <Pagination.Next
          aria-hidden
          children="▶"
          disabled={pageNo === lastPageNo}
          onClick={() => {
            handleArrowBtnClick(1);
          }}
        />
      </Pagination>
    </Container>
  );
}

export default CustomPagination;
