import React, { useState } from "react";
import moment from "moment";
import { GridColDef } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import Table from "../../components/Table/Table";
import MainPageContainer from "../../containers/MainPageContainer/MainPageContainer";
import { DeleteIcon, EditIcon, ShowIcon } from "../../assets/svg/header-svg";
import DeleteMenu from "../../components/DeleteMenu/DeleteMenu";
import { Link } from "react-router-dom";
import { useCourses } from "./Courses.hooks";
import { MAIN_URL } from "../../../env";
import EditCourse from "./EditCourse";

const Courses = () => {
  const { t } = useTranslation();
  const [openEditPage, setOpenPage] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
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
  } = useCourses();

  const dataColumns: GridColDef[] = [
    {
      field: "id",
      headerName: t("Course ID"),
      flex: 1,
      sortable: false,
    },
    {
      field: "courseName",
      headerName: t("Course Title"),
      flex: 1,
      sortable: false,
      renderCell: ({ row }) => {
        return (
          <>{t("locale") === "ar" ? row?.courseNameArabic : row?.courseName}</>
        );
      },
    },
    {
      field: "imageUrl",
      headerName: t("Course Image"),
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
      field: "service",
      headerName: t("Service"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        return (
          <>
            {t("locale") === "ar"
              ? formattedValue?.serviceNameArabic
              : formattedValue?.serviceName}
          </>
        );
      },
    },
    {
      field: "subService",
      headerName: t("Sub Service"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        return (
          <>
            {t("locale") === "ar"
              ? formattedValue?.subServiceNameArabic
              : formattedValue?.subServiceName}
          </>
        );
      },
    },
    {
      field: "category",
      headerName: t("Category"),
      flex: 1,
      sortable: false,
      renderCell: ({ formattedValue }) => {
        return (
          <>
            {t("locale") === "ar"
              ? formattedValue?.categoryNameArabic
              : formattedValue?.categoryName}
          </>
        );
      },
    },
    {
      field: "uploadedAt",
      headerName: t("Uploaded At"),
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
            <Link to={`/course-details/${row?.id}`} className="cursor-pointer">
              <ShowIcon />
            </Link>
            <span
              className="cursor-pointer"
              onClick={() => {
                handleEditPage();
                setSelectedCourse(row);
              }}
            >
              <EditIcon />
            </span>
            <span
              className="cursor-pointer"
              onClick={() => setSelectedCourse(row)}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      },
    },
  ];

  const handleDelete = () => {
    if (selectedCourse) {
      setSelectedCourse(null);
      setData(data.filter((item: any) => item.id !== selectedCourse.id));
      setCount(count - 1);
    }
  };

  const handleEditPage = () => {
    setOpenPage(!openEditPage);
  };

  return openEditPage ? (
    <EditCourse
      courseData={selectedCourse}
      onClose={() => {
        handleEditPage();
        setSelectedCourse(null);
      }}
    />
  ) : (
    <MainPageContainer
      title="Courses"
      btnName="Course"
      btnLink="/add-course"
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

      {selectedCourse && (
        <DeleteMenu
          title="Course"
          id={selectedCourse?.id}
          onClose={() => setSelectedCourse(null)}
          onSave={handleDelete}
          name={
            t("locale") === "ar"
              ? selectedCourse?.courseNameArabic
              : selectedCourse?.courseName
          }
        />
      )}
    </MainPageContainer>
  );
};

export default Courses;
