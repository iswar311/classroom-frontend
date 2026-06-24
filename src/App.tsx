import { Refine } from "@refinedev/core";
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
} from "react-router";

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

import {
  Home,
  BookOpen,
  GraduationCap,
} from "lucide-react";

import { dataProvider } from "@/providers/data";


function App() {
  return (
    <BrowserRouter>

      <RefineKbarProvider>

        <ThemeProvider>

          <DevtoolsProvider>

            <Refine

              dataProvider={dataProvider}

              notificationProvider={
                useNotificationProvider()
              }

              routerProvider={routerProvider}


              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId:
                  "jtNqZy-1VTAjv-OXwtBn",
              }}


              resources={[

                {
                  name: "dashboard",
                  list: "/",
                  meta: {
                    label: "Home",
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

                  create:
                    "/classes/create",

                  show:
                    "/classes/show/:id",

                  meta: {
                    label: "Classes",
                    icon:
                      <GraduationCap />,
                  },
                },

              ]}



            >

              <Routes>


                <Route

                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }

                >


                  {/* Dashboard */}

                  <Route
                    path="/"
                    element={
                      <Dashboard />
                    }
                  />



                  {/* Subjects */}

                  <Route path="subjects">


                    <Route

                      index

                      element={
                        <SubjectsList />
                      }

                    />


                    <Route

                      path="create"

                      element={
                        <SubjectsCreate />
                      }

                    />


                  </Route>




                  {/* Classes */}

                  <Route path="classes">


                    <Route

                      index

                      element={
                        <ClassesList />
                      }

                    />


                    <Route

                      path="create"

                      element={
                        <ClassesCreate />
                      }

                    />


                    <Route

                      path="show/:id"

                      element={
                        <ClassesShow />
                      }

                    />


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