import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import { SnackbarContainer } from "./containers/Notifier";

import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import MainServices from "./pages/Services";
import Careers from "./pages/Careers/Careers";
import Reviews from "./pages/Reviews/Reviews";
import Courses from "./pages/Courses/Courses";
import Categories from "./pages/Categories/Categories";
import AddCareer from "./pages/Careers/AddCareer/AddCareer";
import AddCategory from "./pages/Categories/AddCategory/AddCategory";
import LoggedInLayout from "./containers/LoggedInLayout/LoggedInLayout";
import ArticleDetails from "./pages/News/ArticleDetails/ArticleDetails";
import ReviewDetails from "./pages/Reviews/ReviewDetails/ReviewDetails";
import CareerDetails from "./pages/Careers/CareerDetails/CareerDetails";
import CourseDetails from "./pages/Courses/CourseDetails/CourseDetails";
import ServiceDetails from "./pages/Services/ServiceDetails/ServiceDetails";
import CategoryDetails from "./pages/Categories/CategoryDetails/CategoryDetails";
import SubServiceDetails from "./pages/Services/SubServicesDetails/SubServicesDetails";
import AddCourse from "./pages/Courses/AddCourse/AddCourse";
import AddArticle from "./pages/News/AddArticle/AddArticle";
import AddService from "./pages/Services/AddService/AddService";
import AddSubService from "./pages/Services/AddSubService/AddSubService";
import AddReview from "./pages/Reviews/AddReview/AddReview";
import Mails from "./pages/Mails";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <SnackbarProvider
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          content={(key) => <SnackbarContainer id={key} />}
        >
          <BrowserRouter>
            <Routes>
              <Route element={<Login />} path="/login" />
              <Route
                element={
                  <LoggedInLayout>
                    <Home />
                  </LoggedInLayout>
                }
                path="/"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <Courses />
                  </LoggedInLayout>
                }
                path="/courses"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <CourseDetails />
                  </LoggedInLayout>
                }
                path="/course-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <AddCourse />
                  </LoggedInLayout>
                }
                path="/add-course"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <Careers />
                  </LoggedInLayout>
                }
                path="/careers"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <CareerDetails />
                  </LoggedInLayout>
                }
                path="/career-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <AddCareer />
                  </LoggedInLayout>
                }
                path="/add-career"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <Categories />
                  </LoggedInLayout>
                }
                path="/categories"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <CategoryDetails />
                  </LoggedInLayout>
                }
                path="/category-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <AddCategory />
                  </LoggedInLayout>
                }
                path="/add-category"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <News />
                  </LoggedInLayout>
                }
                path="/news"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <ArticleDetails />
                  </LoggedInLayout>
                }
                path="/article-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <AddArticle />
                  </LoggedInLayout>
                }
                path="/add-article"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <Reviews />
                  </LoggedInLayout>
                }
                path="/reviews"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <ReviewDetails />
                  </LoggedInLayout>
                }
                path="/review-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <AddReview />
                  </LoggedInLayout>
                }
                path="/add-review"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <MainServices />
                  </LoggedInLayout>
                }
                path="/services"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <ServiceDetails />
                  </LoggedInLayout>
                }
                path="/service-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <AddService />
                  </LoggedInLayout>
                }
                path="/add-service"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <AddSubService />
                  </LoggedInLayout>
                }
                path="/add-sub-service"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <SubServiceDetails />
                  </LoggedInLayout>
                }
                path="/sub-service-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <Mails />
                  </LoggedInLayout>
                }
                path="/mails"
              />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </div>
  );
};

export default App;
