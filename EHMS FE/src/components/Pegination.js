const TabelPagination = (data) => {

  const numbers = data.numbers

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={data.prevPage}>
            Prev
          </a>
        </li>
        {numbers?.map((n, i) => (
          <li
            className={`page-item ${data.currentPage === n ? "active" : ""}`}
            key={i}
          >
            <a
              href="#"
              className="page-link"
              onClick={() => data.changePage(n)}
            >
              {n}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a href="#" className="page-link" onClick={data.nextPage}>
            Next
          </a>
        </li>
      </ul>
    </nav >
  );

}




export default TabelPagination;

