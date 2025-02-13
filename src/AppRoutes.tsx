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
import ManagePublicRoomPage from "./pages/ManagePublicRoomPage";
import RoomDetailsPage from "./pages/RoomDetailsPage";
import { useEffect } from "react";
import { useGetMyUser, useUpdateIsChatSelected } from "./api/MyUserApi";

const AppRoutes = () => {
  const { currentUser } = useGetMyUser();
  const { isChatSelected } = useUpdateIsChatSelected();
  const targetId = import.meta.env.VITE_TARGET_ID;
  useEffect(() => {
    isChatSelected(false);
  }, []);
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
        {currentUser?._id === targetId ? (
          <Route
            path="/add-public-room"
            element={
              <Layout>
                <ManagePublicRoomPage />
              </Layout>
            }
          />
        ) : null}
        {currentUser?._id === targetId ? (
          <Route
            path="/rooms-details"
            element={
              <Layout>
                <RoomDetailsPage />
              </Layout>
            }
          />
        ) : null}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
