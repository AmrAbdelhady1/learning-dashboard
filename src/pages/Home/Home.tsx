import React, { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { MAIN_URL } from "../../../env";
import { useHome } from "./Home.hooks";
import { useAppDispatch } from "../../redux/store";
import { updateLoader, addSnackbar } from "../../redux/reducers";
import { fetchData } from "../../axios/axiosClient";

const allowedTypes = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/avi",
  "video/mpeg",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/x-flv",
  "video/x-matroska",
];

type UploadedFile = {
  name: string;
  type: string;
  size: number;
  lastModified: number;
};

const Home = () => {
  const { data } = useHome();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [uploadedVideo, setUploadedVideo] = useState<UploadedFile | any>(null);

  const handleVideoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (allowedTypes.includes(files[0].type)) {
      try {
        dispatch(
          updateLoader({
            details: {
              title: t("Please Wait..."),
              desc: t("Please Wait..."),
            },
            show: true,
          })
        );
        const url = data?.vedioUrl ? "Home/UpdateVideo" : "Home/UploadVideo";

        const res = await fetchData(
          { ImageFile: files[0], id: 1 },
          url,
          "POST",
          true
        );

        if (res?.data) {
          dispatch(addSnackbar({ message: res?.message }));
        } else {
          dispatch(
            addSnackbar({
              message: res?.errorMessage,
              type: "error",
            })
          );
        }
      } catch (err) {
        dispatch(addSnackbar({ message: t("network error"), type: "error" }));
      } finally {
        dispatch(
          updateLoader({
            details: {
              title: t("Please Wait..."),
              desc: t("Please Wait..."),
            },
            show: false,
          })
        );
      }
      setUploadedVideo(files[0]);
    } else {
      dispatch(
        addSnackbar({
          message: t("Please upload only Video"),
          type: "error",
        })
      );
    }
  };

  return (
    <div className="main-container p-8 !gap-10">
      <div className="flex items-start justify-between">
        <p className="font-bold text-2xl">{t("Home Page Video")}</p>
        <label
          htmlFor="video-upload"
          className="btn-primary cursor-pointer max-w-[200px]"
        >
          {t("Upload new video")}
          <input
            id="video-upload"
            type="file"
            className="w-full h-full hidden"
            onChange={handleVideoUpload}
          />
        </label>
      </div>

      {(data?.vedioUrl || uploadedVideo) && (
        <div className="h-[580px] w-fit max-w-[1200px] rounded-[40px] border-[11px] border-primary overflow-hidden relative mx-auto">
          <video
            src={
              uploadedVideo
                ? URL.createObjectURL(uploadedVideo)
                : MAIN_URL + data?.vedioUrl
            }
            controls
            className="w-full h-full"
          ></video>
        </div>
      )}
    </div>
  );
};

export default Home;
