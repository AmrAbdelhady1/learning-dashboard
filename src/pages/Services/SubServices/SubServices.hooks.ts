import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { fetchData as fetch } from "../../../axios/axiosClient";
import { addSnackbar, updateLoader } from "../../../redux/reducers";

export const useSubServices = () => {
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
        "SubServices",
        "GET"
      );

      if (res?.data) {
        setData(res?.data[0]?.items);
        setCount(res?.data[0]?.totalCount);
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
