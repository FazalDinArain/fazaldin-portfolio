import { Link } from "next-view-transitions";

type Props = {
  page: number;
  totalPages: number;
};

function pageHref(n: number): string {
  return n === 1 ? "/blog/" : `/blog/${n}/`;
}

export function Pagination({ page, totalPages }: Props) {
  return (
    <nav className="pagination" aria-label="Pagination">
      {page <= 1 ? (
        <span className="pagination-btn pagination-prev disabled" aria-disabled>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Previous</span>
        </span>
      ) : (
        <Link href={pageHref(page - 1)} className="pagination-btn pagination-prev">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Previous</span>
        </Link>
      )}
      <div className="pagination-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <Link
            key={n}
            href={pageHref(n)}
            className={`pagination-number${n === page ? " active" : ""}`}
            aria-current={n === page ? "page" : undefined}
          >
            {n}
          </Link>
        ))}
      </div>
      {page >= totalPages ? (
        <span className="pagination-btn pagination-next disabled" aria-disabled>
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      ) : (
        <Link href={pageHref(page + 1)} className="pagination-btn pagination-next" aria-label="Next page">
          <span>Next</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      )}
    </nav>
  );
}
