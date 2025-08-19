import React, { useEffect, useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { useNavigate } from 'react-router-dom';
import {
  useGetUserQuery,
  useGetDashboardQuery,
  useUserExistQuery
} from "./services/features/users/userApi";
import { useDispatch } from "react-redux";
import {
  addToken,
  setPermissions,
} from "./services/features/auth/authSlice";
import { addUserInfo } from "./services/features/users/userSlice";

const OidcLoginRedirect = () => {
  const auth = useAuth();
  const navigate = useNavigate()
  const [id, setId] = useState(null)
  // const { data: userDetails } = useGetUserQuery(id, { skip: !id })
  const [cognitoId, setCognitoId] = useState(null)
  const { data: userdata } = useUserExistQuery(id, { skip: !cognitoId })
  const dispatch = useDispatch();

  console.log(userdata, "userdata")

  useEffect(() => {
    console.log('auth', auth);
    // auth.signoutPopup();

    if (!auth.isLoading && !auth.isAuthenticated) {
      console.log('auth', auth);
      auth.signinRedirect();
    }
    if (auth.isAuthenticated) {
      // auth.signoutRedirect();
      setId(auth.user?.profile?.sub);
      console.log(auth.user?.profile?.sub);
      setCognitoId(auth.user?.profile?.sub)
      localStorage.setItem('token', auth.user.id_token);
      const groups = auth.user?.profile?.["cognito:groups"] || [];
      console.log(groups)
      if (groups.includes("hrmsAccess")) {
        console.log('dashboard')
        navigate('/callback');
      } else {
        navigate('/subscribe-hrms');
      }
    }
  }, [auth.isLoading, auth.isAuthenticated]);
  // useEffect(() => {
  //   if (userdata) {
  //     console.log(userdata, "userdata")
  //     const token = localStorage.getItem('token')
  //     dispatch(addToken({ role: userdata?.data?.role, accessToken: token }));

  //     localStorage.setItem("authUser", userdata?.data);
  //     dispatch(addUserInfo({
  //       id: userdata?.data?._id,
  //       name: `${userdata?.data?.firstName} ${userdata?.data?.lastName}`,
  //       email: userdata?.data?.email,
  //       status: userdata?.data?.status,
  //     }))
  //   }
  // }, [userdata])
  if (auth.isLoading || !auth.isAuthenticated) {
    return <div>Redirecting to login...</div>;
  }

  return null;
};

export default OidcLoginRedirect;
