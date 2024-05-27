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

const Reviews = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<any>(null);
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
      field: "Title",
      headerName: t("Review Title"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            {t("locale") === "ar" ? row?.titleArabic : row?.title}
          </>
        );
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
        return (
          <>
            {t("locale") === "ar" ? row?.jobArabic : row?.job}
          </>
        );
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
      field: "createdAt",
      headerName: t("Created At"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        if (formattedValue) {
          return <p>{moment(formattedValue).format("MMM D, YYYY")}</p>;
        }
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
            <span className="cursor-pointer">
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

  return (
    <MainPageContainer
      title="Reviews"
      btnName="Review"
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