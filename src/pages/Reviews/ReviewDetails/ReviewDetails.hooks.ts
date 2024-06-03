import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { addSnackbar, updateLoader } from "../../../redux/reducers";
import { fetchData as fetch } from "../../../axios/axiosClient";
import { useTranslation } from "react-i18next";

export const useReviewDetails = (id: string) => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

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

      const res = await fetch("", `Reviews/${id}`, "GET");

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

  return { data };
};
