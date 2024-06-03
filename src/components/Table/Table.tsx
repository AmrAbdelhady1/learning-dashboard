import React from "react";

import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { arSD } from "@mui/x-data-grid/locales";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

import "./style.css";

const Table = (props: DataGridProps) => {
  const { ...otherProps } = props;
  const { t } = useTranslation();
  const existingTheme = useTheme();
  const theme = React.useMemo(
    () =>
      createTheme({}, arSD, existingTheme, {
        direction: "rtl",
      }),
    [existingTheme]
  );
  const englishTheme = createTheme({});

  return (
    <ThemeProvider theme={t("locale") === "ar" ? theme : englishTheme}>
      <div dir={t("dir")}>
        <DataGrid
          autoHeight
          disableColumnMenu={true}
          disableColumnSelector={true}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 30, 50]}
          checkboxSelection={false}
          className="center-data"
          {...otherProps}
        />
      </div>
    </ThemeProvider>
  );
};

export default Table;
