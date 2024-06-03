import React, { useState } from "react";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { DeleteIcon, EditIcon, ShowIcon } from "../../assets/svg/header-svg";
import DeleteMenu from "../../components/DeleteMenu/DeleteMenu";
import { Link } from "react-router-dom";
import { useNews } from "./News.hooks";
import EditArticle from "./EditArticle";
import { MAIN_URL } from "../../../env";

const News = () => {
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
  } = useNews();

  const dataColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("Article ID"),
      flex: 1,
      sortable: false,
    },
    {
      field: "imageUrl",
      headerName: t("Article Image"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        if (formattedValue) {
          return (
            <img
              alt="course image"
              src={`${MAIN_URL}${formattedValue}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          );
        }
      },
    },
    {
      field: "Title",
      headerName: t("Article Title"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <p className="line-clamp-1">
            {t("locale") === "ar" ? row?.titleArabic : row?.title}
          </p>
        );
      },
    },
    {
      field: "Author",
      headerName: t("Article Author"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <p className="line-clamp-1">
            {t("locale") === "ar" ? row?.authorArabic : row?.author}
          </p>
        );
      },
    },
    {
      field: "content",
      headerName: t("Content"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <p className="line-clamp-1">
            {t("locale") === "ar" ? row?.contentArabic : row?.content}
          </p>
        );
      },
    },
    {
      field: "publishedDate",
      headerName: t("Published At"),
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
            <Link to={`/article-details/${row?.id}`} className="cursor-pointer">
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
    <EditArticle
      articleData={selectedItem}
      onClose={() => {
        handleEditPage();
        setSelectedItem(null);
      }}
    />
  ) : (
    <MainPageContainer
      title="News"
      btnName="Article"
      btnLink="/add-article"
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
          title="News"
          id={selectedItem?.id}
          onClose={() => setSelectedItem(null)}
          onSave={handleDelete}
          name={
            t("locale") === "ar"
              ? selectedItem?.titleArabic
              : selectedItem?.title
          }
        />
      )}
    </MainPageContainer>
  );
};

export default News;
