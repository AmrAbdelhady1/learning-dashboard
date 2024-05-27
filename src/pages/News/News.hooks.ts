import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { addSnackbar, updateLoader } from "../../redux/reducers";
import { fetchData as fetch } from "../../axios/axiosClient";

export const useNews = () => {
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
            title: "Loading Data",
            desc: "Fetching Data...",
          },
          show: true,
        })
      );

      setCounter(counter + 1);

      const res = await fetch(
        { pageNumber: page, pageSize: limit, searchTerm: search },
        "News",
        "GET"
      );

      if (res?.data) {
        setData(res?.data?.items);
        setCount(res?.data?.totalCount);
      }
    } catch (error) {
      dispatch(addSnackbar({ message: "Network Error", type: "error" }));
    } finally {
      dispatch(
        updateLoader({
          details: {
            title: "Loading Data",
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
