import React, { useState } from "react";
import moment from "moment";
import { useCareers } from "./Careers.hooks";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { DeleteIcon, EditIcon, ShowIcon } from "../../assets/svg/header-svg";
import DeleteMenu from "../../components/DeleteMenu/DeleteMenu";
import { Link } from "react-router-dom";

const Careers = () => {
  const { t } = useTranslation();
  const [selectedCareer, setSelectedCareer] = useState<any>(null);
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
  } = useCareers();

  const dataColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("Career ID"),
      flex: 1,
      sortable: false,
    },
    {
      field: "job",
      headerName: t("Title"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return <>{t("locale") === "ar" ? row?.jobArabic : row?.job}</>;
      },
    },
    {
      field: "location",
      headerName: t("Location"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>{t("locale") === "ar" ? row?.locationArabic : row?.location}</>
        );
      },
    },
    {
      field: "type",
      headerName: t("Type"),
      flex: 1,
      sortable: false,
    },
    {
      field: "description",
      headerName: t("Description"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>
            {t("locale") === "ar" ? row?.descriptionArabic : row?.description}
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
            <Link to={`/career-details/${row?.id}`} className="cursor-pointer">
              <ShowIcon />
            </Link>
            <span className="cursor-pointer">
              <EditIcon />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setSelectedCareer(row)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const handleDelete = () => {
    if (selectedCareer) {
      setSelectedCareer(null);
      setData(data.filter((career: any) => career.id !== selectedCareer.id));
      setCount(count - 1);
    }
  };

  return (
    <MainPageContainer
      title="Careers"
      btnName="Career"
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

      {selectedCareer && (
        <DeleteMenu
          title="Career"
          id={selectedCareer?.id}
          onClose={() => setSelectedCareer(null)}
          onSave={handleDelete}
          name={
            t("locale") === "ar"
              ? selectedCareer?.jobArabic
              : selectedCareer?.job
          }
        />
      )}
    </MainPageContainer>
  );
};

export default Careers;
