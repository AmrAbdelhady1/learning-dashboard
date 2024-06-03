import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDown } from "../../assets/svg/header-svg";

interface SubService {
  id: number;
  subServiceName: string;
  subServiceNameArabic: string;
}

interface Props {
  selectedItem: SubService | null;
  setSelectedItem: (item: SubService) => void;
  data: SubService[];
}

const SubServiceDropDown = ({ selectedItem, setSelectedItem, data }: Props) => {
  const { t } = useTranslation();
  const menuRef = useRef<any>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    let handler = (e: any) => {
      if (!menuRef.current.contains(e.target) && openMenu) {
        handleMenuChange();
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const handleMenuChange = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-sm capitalize text-gray600">{t("Sub Service")}</p>

      <div
        ref={menuRef}
        onClick={handleMenuChange}
        className={`relative w-full py-2.5 px-3.5 h-[46px] flex items-center justify-between rounded-lg cursor-pointer ${
          openMenu ? "ring-2 ring-primary" : "border border-secondary"
        }`}
      >
        <p>
          {selectedItem ? (
            t("locale") === "ar" ? (
              selectedItem.subServiceNameArabic
            ) : (
              selectedItem.subServiceName
            )
          ) : (
            <span className="text-gray-500">{t("Please select the sub service")}</span>
          )}
        </p>

        <ArrowDown />

        {openMenu && (
          <div className="absolute top-full inset-x-0 mt-2 w-full bg-white rounded-md shadow-lg z-10 py-2 max-h-[200px] overflow-scroll hide-scrollbar">
            {data.map((item) => (
              <p
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                {t("locale") === "ar"
                  ? item.subServiceNameArabic
                  : item.subServiceName}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubServiceDropDown;
