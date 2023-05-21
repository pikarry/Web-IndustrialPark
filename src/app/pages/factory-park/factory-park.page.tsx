import Button from "@app/components/button";
import FactoryCard from "@app/components/factory-card";
import FactoryModal from "@app/components/factory-modal";
import NotFound from "@app/components/not-found";
import Pagination from "@app/components/pagination";
import { addToast } from "@app/components/toast/toast.service";
import { DEFAULT_PAGE } from "@app/constants";
import ContractService from "@app/services/http/contact.service";
import FactoryService from "@app/services/http/factory.service";
import IndustrialService from "@app/services/http/industrial.service";
import { openPortalDialog } from "@app/services/modal.service";
import { Factory, GetFactoriesQuery, Industrial } from "@app/types";
import { Images } from "@assets/images";
import useObservable from "@core/hooks/use-observable.hook";
import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function FactoryPark() {
  const { industrialId } = useParams();

  const [page, setPage] = useState(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState(DEFAULT_PAGE);
  const [industrial, setIndustrial] = useState<Industrial | null>(null);
  const [factories, setFactories] = useState<Factory[]>([]);
  const [search, setSearch] = useState("");
  const [text, setText] = useState("");

  const { subscribeOnce, subscribeUntilDestroy } = useObservable();

  useEffect(() => {
    if (industrialId) {
      subscribeOnce(IndustrialService.getDetail(industrialId), (data) => {
        setIndustrial(data);
      });
    }
  }, [industrialId]);

  useEffect(() => {
    if (industrialId) {
      let query: GetFactoriesQuery = {
        page,
      };

      if (search) {
        query = {
          ...query,
          search,
        };
      }

      subscribeUntilDestroy(
        FactoryService.getFactories(industrialId, query),
        (res) => {
          setFactories(res.factories);
          setTotalPages(res.total_page);
        }
      );
    }
  }, [industrialId, page, search]);

  const handleRentClick = (factory: Factory) => {
    const factoryModalObs = openPortalDialog(FactoryModal, { factory });

    factoryModalObs.afterClosed().subscribe((data) => {
      if (data?.createContractRequest) {
        subscribeOnce(
          ContractService.createContract(data.createContractRequest),
          () => {
            addToast({ text: "Thuê thành công" });
          }
        );
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
      <div className="text-[#3A4664] text-4xl font-bold">
        {industrial && industrial.name}
      </div>
      <div className="flex mt-6">
        <div className="w-[500px] relative">
          <input
            className={clsx(
              "w-full outline-none bg-transparent border border-solid border-[#A7B1C5]",
              "rounded-[20px] leading-10 h-10 pr-4 pl-12 py-1"
            )}
            type="text"
            placeholder="Tên, diện tích xưởng"
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
        {!!factories.length &&
          factories.map((fatory) => (
            <FactoryCard
              key={fatory._id}
              factory={fatory}
              onRentClick={() => {
                handleRentClick(fatory);
              }}
            />
          ))}
      </div>
      <div className="mt-4 flex justify-center">
        {!!factories.length && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
      </div>
      <div className="mt-28">{!factories.length && <NotFound />}</div>
    </div>
  );
}

export default FactoryPark;
