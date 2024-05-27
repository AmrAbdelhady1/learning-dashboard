import React, { useState } from "react";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { DeleteIcon, EditIcon, ShowIcon } from "../../assets/svg/header-svg";
import DeleteMenu from "../../components/DeleteMenu/DeleteMenu";
import { Link } from "react-router-dom";
import { useCategories } from "./Categories.hooks";

const Categories = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
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
  } = useCategories();

  const dataColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("Category ID"),
      flex: 1,
      sortable: false,
    },
    {
      field: "categoryName",
      headerName: t("Category Title"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            {t("locale") === "ar" ? row?.categoryNameArabic : row?.categoryName}
          </>
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
      field: "actions",
      headerName: t("Actions"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <Link
              to={`/category-details/${row?.id}`}
              className="cursor-pointer"
            >
              <ShowIcon />
            </Link>
            <span className="cursor-pointer">
              <EditIcon />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setSelectedCategory(row)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const handleDelete = () => {
    if (selectedCategory) {
      setSelectedCategory(null);
      setData(data.filter((career: any) => career.id !== selectedCategory.id));
      setCount(count - 1);
    }
  };

  return (
    <MainPageContainer
      title="Categories"
      btnName="Category"
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

      {selectedCategory && (
        <DeleteMenu
          title="Category"
          id={selectedCategory?.id}
          onClose={() => setSelectedCategory(null)}
          onSave={handleDelete}
          name={
            t("locale") === "ar"
              ? selectedCategory?.categoryNameArabic
              : selectedCategory?.categoryName
          }
        />
      )}
    </MainPageContainer>
  );
};

export default Categories;
