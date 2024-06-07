import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { addSnackbar, updateLoader } from "../../redux/reducers";
import { fetchData as fetch } from "../../axios/axiosClient";
import { useTranslation } from "react-i18next";

export const useCourses = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
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
        "Course",
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

export const useAddCourses = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [subServiceData, setSubServiceData] = useState([]);

  const fetchData = async () => {
    try {
      const categoryRes = await fetch("", "Category", "GET");
      const serviceRes = await fetch("", "Service", "GET");
      const subServiceRes = await fetch("", "SubServices", "GET");

      if (categoryRes?.data) {
        setCategoryData(categoryRes?.data?.items);
      }
      if (serviceRes?.data) {
        setServiceData(serviceRes?.data?.items);
      }
      if (subServiceRes?.data) {
        setSubServiceData(subServiceRes?.data[0]?.items);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    categoryData,
    serviceData,
    subServiceData,
  };
};
