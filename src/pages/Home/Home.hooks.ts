import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { fetchData as fetch } from "../../axios/axiosClient";
import { addSnackbar, updateLoader } from "../../redux/reducers";

export const useHome = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({
    id: 1,
    vedioUrl: "",
  });

  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      dispatch(
        updateLoader({
          details: {
            title: t("Loading Data"),
            desc: "Fetching Data...",
          },
          show: true,
        })
      );

      const res = await fetch("", "Home", "GET");

      if (res?.data) {
        setData(res?.data);
      }
    } catch (error) {
      dispatch(addSnackbar({ message: t("Network Error"), type: "error" }));
    } finally {
      dispatch(
        updateLoader({
          details: {
            title: t("Loading Data"),
            desc: "Fetching Data...",
          },
          show: false,
        })
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
  };
};
