import { useEffect, useState } from "react";
import { useAppDispatch } from "../../../redux/store";
import { addSnackbar, updateLoader } from "../../../redux/reducers";
import { fetchData as fetch } from "../../../axios/axiosClient";

export const useServiceDetails = (id: string) => {
  const [data, setData] = useState([]);

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

      const res = await fetch("", `Service/${id}`, "GET");

      if (res?.data) {
        setData(res?.data);
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

  useEffect(() => {
    fetchData();
  }, []);

  return { data };
};
