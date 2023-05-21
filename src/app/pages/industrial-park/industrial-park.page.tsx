import Button from "@app/components/button";
import IndustrialCard from "@app/components/industrial-card";
import IndustrialModal from "@app/components/industrial-modal";
import NotFound from "@app/components/not-found";
import Pagination from "@app/components/pagination";
import { DEFAULT_PAGE } from "@app/constants";
import IndustrialService from "@app/services/http/industrial.service";
import { openPortalDialog } from "@app/services/modal.service";
import { GetIndustrialsQuery, Industrial } from "@app/types";
import { Images } from "@assets/images";
import useObservable from "@core/hooks/use-observable.hook";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function IndustrialPark() {
  const navigate = useNavigate();

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);
  const [industrials, setIndustrials] = useState<Industrial[]>([]);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");

  const { subscribeUntilDestroy } = useObservable();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    let query: GetIndustrialsQuery = {
      page,
    };

    if (search) {
      query = {
        ...query,
        search,
      };
    }

    subscribeUntilDestroy(IndustrialService.getIndustrials(query), (res) => {
      setIndustrials(res.industrials);
      setTotalPages(res.total_page);
    });
  }, [page, search]);

  const handleViewInfoButtonClick = (industrial: Industrial) => {
    const industrialDetailObs = openPortalDialog(IndustrialModal, {
      industrial,
    });

    industrialDetailObs.afterClosed().subscribe((data) => {
      if (data?.industrialId) {
        navigate(`/industrials/${data.industrialId}/factories`);
      }
    });
  };

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSearchClick = () => {
    setSearch(text);
  };

  return (
    <div className="px-6 py-6">
      <div className="flex mt-2">
        <div className="w-[500px] relative">
          <input
            className={clsx(
              "w-full outline-none bg-transparent border border-solid border-[#A7B1C5]",
              "rounded-[20px] leading-10 h-10 pr-4 pl-12 py-1"
            )}
            type="text"
            placeholder="Tên, diện tích, vị trí khu công nghiệp"
            onChange={onSearchChange}
          />
          <img
            className="absolute w-6 h-6 left-4 top-2"
            src={Images.SeachNormalIcon.default}
            alt=""
          />
        </div>
        <Button
          containerClassName="ml-9"
          className="px-5 rounded-lg"
          label="Tìm kiếm"
          width="fit-content"
          labelClassName="font-bold"
          onClick={handleSearchClick}
        />
      </div>
      <div className="flex flex-wrap gap-9 mt-6">
        {!!industrials.length &&
          industrials.map((industrial) => (
            <IndustrialCard
              key={industrial._id}
              industrial={industrial}
              onViewInfoClick={() => {
                handleViewInfoButtonClick(industrial);
              }}
            />
          ))}
      </div>
      <div className="mt-4 flex justify-center">
        {!!industrials.length && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
      <div className="mt-28">{!industrials.length && <NotFound />}</div>
    </div>
  );
}

export default IndustrialPark;
