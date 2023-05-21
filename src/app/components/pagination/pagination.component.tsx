import clsx from "clsx";
import usePagination from "@mui/material/usePagination";

interface PaginationProps {
  currentPage: number;

  totalPages: number;

  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const { items } = usePagination({
    count: totalPages,
    page: currentPage,
    onChange: (_, page) => {
      onPageChange(page);
    },
  });

  return (
    <div className="flex gap-1">
      {items.map(({ page, type, selected, ...item }, index) => {
        switch (type) {
          case "start-ellipsis":
          case "end-ellipsis":
            return (
              <div key={index} className="w-10 text-center">
                ...
              </div>
            );
          case "page":
            return (
              <div
                key={index}
                className={clsx(
                  "w-[30px] h-[30px] cursor-pointer bg-white rounded-full hover:bg-[#4da9ff]",
                  "border border-solid border-[#3A46644D] flex justify-center items-center hover:text-white",
                  { "!bg-[#1E86E5] text-white": selected }
                )}
                {...item}
              >
                {page}
              </div>
            );
          case "previous":
            return (
              <div
                key={index}
                {...item}
                className={clsx(
                  "w-[30px] h-[30px] cursor-pointer bg-white rounded-full hover:bg-[#4da9ff] select-none",
                  "border border-solid border-[#3A46644D] flex justify-center items-center [&_.stroke-inner]:hover:stroke-white",
                  {
                    "!bg-gray-300 pointer-events-none": item.disabled,
                  }
                )}
              >
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="stroke-inner"
                    d="M8.125 10.6795L4.33333 6.74501L8.125 2.81055"
                    stroke="#3A4664"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            );
          case "next":
            return (
              <div
                key={index}
                {...item}
                className={clsx(
                  "w-[30px] h-[30px] cursor-pointer bg-white rounded-full hover:bg-[#4da9ff] select-none",
                  "border border-solid border-[#3A46644D] flex justify-center items-center [&_.stroke-inner]:hover:stroke-white",
                  {
                    "!bg-gray-300 pointer-events-none": item.disabled,
                  }
                )}
              >
                <svg
                  width="13"
                  height="14"
                  viewBox="0 0 13 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="stroke-inner"
                    d="M4.875 2.80979L8.66667 6.74425L4.875 10.6787"
                    stroke="#3A4664"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            );
          default:
            return (
              <div key={index} {...item}>
                {type}
              </div>
            );
        }
      })}
    </div>
  );
}

export default Pagination;
