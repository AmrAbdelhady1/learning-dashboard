import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import { SnackbarContainer } from "./containers/Notifier";

import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Login from "./pages/Login/Login";
import Careers from "./pages/Careers/Careers";
import Reviews from "./pages/Reviews/Reviews";
import Categories from "./pages/Categories/Categories";
import LoggedInLayout from "./containers/LoggedInLayout/LoggedInLayout";
import CareerDetails from "./pages/Careers/CareerDetails/CareerDetails";
import ArticleDetails from "./pages/News/ArticleDetails/ArticleDetails";
import ReviewDetails from "./pages/Reviews/ReviewDetails/ReviewDetails";
import CategoryDetails from "./pages/Categories/CategoryDetails/CategoryDetails";
import MainServices from "./pages/Services";
import ServiceDetails from "./pages/Services/ServiceDetails/ServiceDetails";
import SubServiceDetails from "./pages/Services/SubServicesDetails/SubServicesDetails";
import SendMail from "./pages/SendMail";

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
                    <SubServiceDetails />
                  </LoggedInLayout>
                }
                path="/sub-service-details/:id"
              />
              <Route
                element={
                  <LoggedInLayout>
                    <SendMail />
                  </LoggedInLayout>
                }
                path="/send-mail"
              />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </Provider>
    </div>
  );
};

export default App;
