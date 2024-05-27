import React from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import { fetchData } from "../../axios/axiosClient";

interface Props {
  id: string;
  name: string;
  title: string;
  onSave: () => void;
  onClose: () => void;
}

const DeleteMenu = ({ id, title, name, onClose, onSave }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const onSubmit = async () => {
    try {
      dispatch(
        updateLoader({
          details: {
            title: "Please Wait...",
            desc: "Please Wait...",
          },
          show: true,
        })
      );

      const res = await fetchData("", `${title}/${id}`, "DELETE");

      if (res) {
        onSave();
        dispatch(addSnackbar({ message: res?.message }));
      } else {
        dispatch(addSnackbar({ message: "Something wrong", type: "error" }));
      }
    } catch (err) {
      dispatch(addSnackbar({ message: "network error", type: "error" }));
    } finally {
      dispatch(
        updateLoader({
          details: {
            title: "Please Wait...",
            desc: "Please Wait...",
          },
          show: false,
        })
      );
    }
  };

  return (
    <div className="fixed inset-0 w-full min-h-screen bg-black/40 flex flex-col items-center justify-center">
      <div className="p-8 w-[600px] bg-white rounded-xl flex flex-col gap-10">
        <p className="text-xl font-medium text-gray600">
          {t("Are you sure you want to delete this")} {t(title)} ({name})?
        </p>

        <div className="flex items-center gap-2 w-full">
          <button className="btn-primary" onClick={onSubmit}>
            {t("Yes")}
          </button>
          <button className="btn-secondary" onClick={onClose}>
            {t("No")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenu;
