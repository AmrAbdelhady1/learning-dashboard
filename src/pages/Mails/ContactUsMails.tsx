import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { useContactUsMails } from "./Mails.hooks";

const ContactUsMails = () => {
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
  } = useContactUsMails();

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
      field: "company",
      headerName: t("Company"),
      flex: 1,
      sortable: false,
    },
    {
      field: "category",
      headerName: t("Category"),
      flex: 1,
      sortable: false,
    },
    {
      field: "message",
      headerName: t("Message"),
      flex: 1,
      sortable: false,
    },
  ];

  return (
    <MainPageContainer
      title="Contact Us Mails"
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

export default ContactUsMails;
