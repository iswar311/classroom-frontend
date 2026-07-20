import { Refine, Authenticated } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";

import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";

import { Layout } from "@/components/refine-ui/layout/layout";

import Dashboard from "@/pages/dashboard";

import SubjectsList from "@/pages/subjects/list";
import SubjectsCreate from "@/pages/subjects/create";

import ClassesList from "@/pages/classes/list";
import ClassesCreate from "@/pages/classes/create";
import ClassesShow from "@/pages/classes/show";

import UsersList from "@/pages/users/list";
import UsersCreate from "@/pages/users/create";
import UsersShow from "@/pages/users/show";
import UsersEdit from "@/pages/users/edit";

import AdminUsers from "@/pages/admin/users";

import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";

import {
  Home,
  BookOpen,
  GraduationCap,
  Settings,
} from "lucide-react";

import { dataProvider } from "@/providers/data";
import authProvider from "@/providers/authProvider";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              authProvider={authProvider}
              routerProvider={routerProvider}
              notificationProvider={useNotificationProvider()}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "jtNqZy-1VTAjv-OXwtBn",
              }}
              resources={[
                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Dashboard",
                    icon: <Home />,
                  },
                },
                {
                  name: "subjects",
                  list: "/subjects",
                  create: "/subjects/create",
                  meta: {
                    label: "Subjects",
                    icon: <BookOpen />,
                  },
                },
                {
                  name: "classes",
                  list: "/classes",
                  create: "/classes/create",
                  show: "/classes/show/:id",
                  meta: {
                    label: "Classes",
                    icon: <GraduationCap />,
                  },
                },
                {
                  name: "users",
                  list: "/users",
                  create: "/users/create",
                  show: "/users/show/:id",
                  edit: "/users/edit/:id",
                  meta: {
                    label: "Users",
                  },
                },
                {
                  name: "admin",
                  list: "/admin/users",
                  meta: {
                    label: "Admin",
                    icon: <Settings />,
                  },
                },
              ]}
            >
              <Routes>

                {/* Public Routes */}
                <Route
                  element={
                    <Authenticated
                      key="public"
                      fallback={<Outlet />}
                    >
                      <Navigate to="/" replace />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                </Route>

                {/* Protected Routes */}
                <Route
                  element={
                    <Authenticated
                      key="protected"
                      redirectOnFail="/login"
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route index element={<Dashboard />} />

                  <Route path="subjects">
                    <Route index element={<SubjectsList />} />
                    <Route path="create" element={<SubjectsCreate />} />
                  </Route>

                  <Route path="classes">
                    <Route index element={<ClassesList />} />
                    <Route path="create" element={<ClassesCreate />} />
                    <Route path="show/:id" element={<ClassesShow />} />
                  </Route>

                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path="create" element={<UsersCreate />} />
                    <Route path="show/:id" element={<UsersShow />} />
                    <Route path="edit/:id" element={<UsersEdit />} />
                  </Route>

                  <Route path="admin">
                    <Route path="users" element={<AdminUsers />} />
                  </Route>
                </Route>

              </Routes>

              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>

            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;