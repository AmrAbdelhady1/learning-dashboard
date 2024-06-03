import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { fetchData as fetch } from "../../axios/axiosClient";
import { addSnackbar, updateLoader } from "../../redux/reducers";
import { useTranslation } from "react-i18next";

export const useRegistersMails = () => {
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
        "EmailUsers/GetAllRegistersUsersFromEmail",
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

export const useCareersMails = () => {
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
        "EmailUsers/GetAllCareerUsers",
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

export const useContactUsMails = () => {
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
        "EmailUsers/GetAllContactUsUsers",
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
