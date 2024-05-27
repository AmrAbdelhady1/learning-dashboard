import React, { useState } from "react";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { DeleteIcon, EditIcon, ShowIcon } from "../../assets/svg/header-svg";
import DeleteMenu from "../../components/DeleteMenu/DeleteMenu";
import { Link } from "react-router-dom";
import { useServices } from "./Services.hooks";

const Services = () => {
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
  } = useServices();

  const dataColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("Service ID"),
      flex: 1,
      sortable: false,
    },
    {
      field: "imageUrl",
      headerName: t("Service Image"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        if (formattedValue) {
          return (
            <img
              src={formattedValue}
              alt="service"
              width={40}
              height={40}
              className="w-10 h-10 object-cover"
            />
          );
        }
      },
    },
    {
      field: "serviceName",
      headerName: t("Service Name"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            {t("locale") === "ar" ? row?.serviceNameArabic : row?.serviceName}
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
          <p className="line-clamp-1">
            {t("locale") === "ar" ? row?.descriptionArabic : row?.description}
          </p>
        );
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
            <Link to={`/service-details/${row?.id}`} className="cursor-pointer">
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
      title="Services"
      btnName="Service"
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
          title="Service"
          id={selectedItem?.id}
          onClose={() => setSelectedItem(null)}
          onSave={handleDelete}
          name={
            t("locale") === "ar"
              ? selectedItem?.serviceNameArabic
              : selectedItem?.serviceName
          }
        />
      )}
    </MainPageContainer>
  );
};

export default Services;
