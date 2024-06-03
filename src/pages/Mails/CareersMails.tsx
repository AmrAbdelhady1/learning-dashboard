import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { useCareersMails } from "./Mails.hooks";
import { Link } from "react-router-dom";
import { MAIN_URL } from "../../../env";

const CareersMails = () => {
  const { t } = useTranslation();
  const {
    data,
    count,
    search,
    setSearch,
    limit,
    page,
    setLimit,
    setPage,
  } = useCareersMails();

  const dataColumns: GridColDef[] = [
    {
      field: "firstName",
      headerName: t("First Name"),
      flex: 1,
      sortable: false,
    },
    {
      field: "lastName",
      headerName: t("Last Name"),
      flex: 1,
      sortable: false,
    },
    {
      field: "email",
      headerName: t("Email"),
      flex: 1,
      sortable: false,
    },
    {
      field: "mobile",
      headerName: t("Mobile"),
      flex: 1,
      sortable: false,
    },
    {
      field: "postion",
      headerName: t("Postion"),
      flex: 1,
      sortable: false,
    },
    {
      field: "yearsOfExperience",
      headerName: t("Years Of Experience"),
      flex: 1,
      sortable: false,
    },
    {
      field: "cvPath",
      headerName: t("CV"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        return (
          <Link
            to={MAIN_URL + formattedValue}
            target="_blank"
            className="underline text-blue-500 underline-offset-4"
          >
            {t("Open CV")}
          </Link>
        );
      },
    },
  ];

  return (
    <MainPageContainer
      title="Careers Mails"
      btnName=""
      btnLink="/"
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
    </MainPageContainer>
  );
};

export default CareersMails;
