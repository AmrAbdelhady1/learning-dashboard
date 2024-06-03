import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { addSnackbar, updateLoader } from "../../redux/reducers";
import { fetchData as fetch } from "../../axios/axiosClient";
import { useTranslation } from "react-i18next";

export const useCareers = () => {
  const { t } = useTranslation();
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState(0);

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

      setCounter(counter + 1);

      const res = await fetch(
        { pageNumber: page, pageSize: limit, searchTerm: search },
        "Career",
        "GET"
      );

      if (res?.data) {
        setData(res?.data?.items);
        setCount(res?.data?.totalCount);
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

  let timeOut: any;

  useEffect(() => {
    if (counter) {
      fetchData();
    }
  }, [page, limit]);

  useEffect(() => {
    if (search) {
      timeOut = setTimeout(() => fetchData(), 500);
    } else {
      fetchData();
    }

    return () => clearTimeout(timeOut);
  }, [search]);

  return {
    data,
    count,
    search,
    page,
    limit,
    setPage,
    setSearch,
    setLimit,
    setData,
    setCount,
  };
};

export const useCities = () => {
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

      const res = await fetch({}, "CityAndCountry/GetAllcity", "GET");

      if (res?.data) {
        setData(res?.data?.items);
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
