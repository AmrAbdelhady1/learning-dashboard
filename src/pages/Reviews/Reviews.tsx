import React, { useState } from "react";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { DeleteIcon, EditIcon, ShowIcon } from "../../assets/svg/header-svg";
import DeleteMenu from "../../components/DeleteMenu/DeleteMenu";
import { Link } from "react-router-dom";
import { useReviews } from "./Reviews.hooks";
import { MAIN_URL } from "../../../env";
import EditReview from "./EditReview";

const Reviews = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [openEditPage, setOpenPage] = useState<boolean>(false);
  const {
    data,
    count,
    search,
    setSearch,
    limit,
    page,
    setLimit,
    setPage,
    setCount,
    setData,
  } = useReviews();

  const dataColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("Review ID"),
      flex: 1,
      sortable: false,
    },
    {
      field: "imageUrl",
      headerName: t("Review Image"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        if (formattedValue) {
          return (
            <img
              alt="review image"
              src={`${MAIN_URL}${formattedValue}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          );
        }
      },
    },
    {
      field: "Title",
      headerName: t("Review Title"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return <>{t("locale") === "ar" ? row?.titleArabic : row?.title}</>;
      },
    },
    {
      field: "reviwerName",
      headerName: t("Client Name"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            {t("locale") === "ar" ? row?.reviwerNameArabic : row?.reviwerName}
          </>
        );
      },
    },
    {
      field: "job",
      headerName: t("Client Job"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return <>{t("locale") === "ar" ? row?.jobArabic : row?.job}</>;
      },
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 2,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <p className=" line-clamp-1">
            {t("locale") === "ar" ? row?.descriptionArabic : row?.description}
          </p>
        );
      },
    },
    {
      field: "actions1",
      headerName: t("Actions"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Link to={`/review-details/${row?.id}`} className="cursor-pointer">
              <ShowIcon />
            </Link>
            <span
              className="cursor-pointer"
              onClick={() => {
                handleEditPage();
                setSelectedItem(row);
              }}
            >
              <EditIcon />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setSelectedItem(row)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const handleDelete = () => {
    if (selectedItem) {
      setSelectedItem(null);
      setData(data.filter((career: any) => career.id !== selectedItem?.id));
      setCount(count - 1);
    }
  };

  const handleEditPage = () => {
    setOpenPage(!openEditPage);
  };

  return openEditPage ? (
    <EditReview
      reviewData={selectedItem}
      onClose={() => {
        handleEditPage();
        setSelectedItem(null);
      }}
    />
  ) : (
    <MainPageContainer
      title="Reviews"
      btnName="Review"
      btnLink="/add-review"
      search={search}
      onChange={(e) => setSearch(e.target.value)}
    >
      <Table
        paginationMode="server"
        columns={dataColumns}
        rows={data}
        rowCount={count}
        getRowId={(row) => row.id}
        onPaginationModelChange={({ page, pageSize }) => {
          setPage(page + 1);
          setLimit(pageSize);
        }}
        initialState={{
          pagination: {
            paginationModel: {
              page: page - 1,
              pageSize: limit,
            },
          },
        }}
      />

      {selectedItem && (
        <DeleteMenu
          title="Review"
          id={selectedItem?.id}
          onClose={() => setSelectedItem(null)}
          onSave={handleDelete}
          name={
            t("locale") === "ar"
              ? selectedItem?.categoryNameArabic
              : selectedItem?.categoryName
          }
        />
      )}
    </MainPageContainer>
  );
};

export default Reviews;
