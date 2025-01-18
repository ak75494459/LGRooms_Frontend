import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageRoomPage from "./pages/ManageRoomPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ShowRoomsPage from "./pages/ShowRoomsPage";
import PublicRoomPage from "./pages/PublicRoomPage";
import ChatBoxPage from "./pages/ChatBoxPage";
import PublicRoomContainerPage from "./pages/PublicRoomContainerPage";


const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <PublicRoomPage />
          </Layout>
        }
      />
      <Route
        path={`/publicroom/:id`}
        element={
          <Layout>
            <PublicRoomContainerPage />
          </Layout>
        }
      />

      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/add-room"
          element={
            <Layout>
              <ManageRoomPage />
            </Layout>
          }
        />
        <Route
          path="/show-rooms"
          element={
            <Layout>
              <ShowRoomsPage />
            </Layout>
          }
        />
        <Route
          path="/chat"
          element={
            <Layout>
              <ChatBoxPage />
            </Layout>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
