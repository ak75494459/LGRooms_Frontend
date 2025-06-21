import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth0();
  const { createUser } = useCreateMyUser();
  const hasCreatedUser = useRef(false);

  useEffect(() => {
    const createAndRedirect = async () => {
      if (user?.sub && user?.email && !hasCreatedUser.current) {
        hasCreatedUser.current = true;
        try {
          await createUser({ auth0Id: user.sub, email: user.email });
          navigate("/");
        } catch (err) {
          console.error("Failed to create user", err);
        }
      }
    };
    if (!isLoading && user) {
      createAndRedirect();
    }
  }, [user, isLoading, createUser, navigate]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
