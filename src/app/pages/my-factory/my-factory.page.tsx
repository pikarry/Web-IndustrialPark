import Button from "@app/components/button";
import MyFactoryCard from "@app/components/my-factory-card";
import NotFound from "@app/components/not-found";
import Pagination from "@app/components/pagination";
import { AcceptName, AcceptType, DEFAULT_PAGE } from "@app/constants";
import ContractService from "@app/services/http/contact.service";
import IndustrialService from "@app/services/http/industrial.service";
import { Industrial } from "@app/types";
import { Contract, GetContractQuery } from "@app/types/contract.type";
import { Images } from "@assets/images";
import useObservable from "@core/hooks/use-observable.hook";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";

function MyFactory() {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [filter, setFilter] = useState({ id_industrial: "", status: "" });
  const [industrials, setIndustrials] = useState<Industrial[]>([]);

  const { subscribeUntilDestroy } = useObservable();

  useEffect(() => {
    subscribeUntilDestroy(IndustrialService.getAllIndustrials(), (data) => {
      setIndustrials(data);
    });
  }, []);

  useEffect(() => {
    let query: GetContractQuery = { page };

    if (filter.status) {
      query = {
        ...query,
        is_accepted: Number(filter.status),
      };
    }

    if (filter.id_industrial) {
      query = {
        ...query,
        id_industrial: filter.id_industrial,
      };
    }

    subscribeUntilDestroy(ContractService.getContracts(query), (res) => {
      setContracts(res.contractes);
      setTotalPages(res.total_page);
    });
  }, [page, filter]);

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newFilter = {
      ...filter,
      [event.target.name]: event.target.value,
    };

    setFilter(newFilter);
  };

  return (
    <div className="px-6 py-6">
      <div className="mt-2 flex justify-between items-center">
        <div className="flex">
          <div className="w-[500px] relative">
            <input
              className={clsx(
                "w-full outline-none bg-transparent border border-solid border-[#A7B1C5]",
                "rounded-[20px] leading-10 h-10 pr-4 pl-12 py-1"
              )}
              type="text"
              placeholder="Tên, diện tích, vị trí xưởng"
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
          />
        </div>
        <div className="flex gap-7">
          <div className="flex gap-1 items-center">
            <div>
              <img src={Images.FilterIcon.default} alt="" />
            </div>
            <div className="text-[#A1A2A8] font-bold text-sm">
              Khu công nghiệp
            </div>
            <div>
              <select
                name="id_industrial"
                className="bg-[#f2f8ff] font-black text-xs"
                onChange={handleFilterChange}
              >
                <option value="">ALL</option>
                {!!industrials.length &&
                  industrials.map((industrial) => (
                    <option key={industrial._id} value={industrial._id}>
                      {industrial.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex gap-1 items-center">
            <div>
              <img src={Images.InfoIcon.default} alt="" />
            </div>
            <div className="text-[#A1A2A8] font-bold text-sm">STATUS</div>
            <div>
              <select
                name="status"
                className="bg-[#f2f8ff] font-black text-xs"
                onChange={handleFilterChange}
              >
                <option value="">ALL</option>
                <option value={AcceptType.ACCEPTED}>
                  {AcceptName[AcceptType.ACCEPTED]}
                </option>
                <option value={AcceptType.PENDING}>
                  {AcceptName[AcceptType.PENDING]}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-9 mt-6 justify-center">
        {!!contracts.length &&
          contracts.map((contract) => (
            <MyFactoryCard key={contract._id} contract={contract} />
          ))}
      </div>
      <div className="mt-4 flex justify-center">
        {!!contracts.length && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
      <div className="mt-28">{!contracts.length && <NotFound />}</div>
    </div>
  );
}

export default MyFactory;
