import { useAuth } from 'react-oidc-context';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  useUserExistQuery } from './services/features/users/userApi';
import { addToken, setPermissions } from './services/features/auth/authSlice';
import { addUserInfo } from './services/features/users/userSlice';
import { useGetRoleByIdQuery } from './services/features/roles/roleApi';

export default function Callback() {
  const auth = useAuth();
  const navigate = useNavigate()
  const [id, setId] = useState(null)
  const [cognitoId, setCognitoId] = useState(null)
  const [role, setRole] = useState(null)
  const { data: userdata } = useUserExistQuery(id, { skip: !cognitoId })
  const dispatch = useDispatch();
  // const [refreshToken] = useRefreshTokensMutation()
  console.log(userdata, "userdata")
  const { data: getRoleDetails, isLoading: isRoleLoading } = useGetRoleByIdQuery(role, { skip: !role });
  console.log(getRoleDetails, "getRoleDetails")
  useEffect(() => {
    console.log('auth', auth);
    if (!auth.isLoading && !auth.isAuthenticated) {
      console.log('auth', auth);
      auth.signinRedirect();
    }
    if (auth.isAuthenticated) {
      setId(auth.user?.profile?.sub);
      console.log(auth.user?.profile?.sub, auth.user.refresh_token);
      setCognitoId(auth.user?.profile?.sub)

      localStorage.setItem('token', auth.user.id_token); // Store token in local storage
      localStorage.setItem('refresh_token', auth.user.refresh_token);

      const groups = auth.user?.profile?.["cognito:groups"] || [];
      console.log(groups);
      if (groups.includes("hrmsAccess")) {
        navigate('/dashboard');
      } else {
        navigate('/subscribe-hrms');
      }
    }
  }, [auth.isLoading, auth.isAuthenticated]);
  useEffect(() => {
    if (userdata) {
      console.log(userdata, "userdata", userdata?.data?.role)
      const token = localStorage.getItem('token')
      // const roleDetailsResponse = async () => {
      //   const response = await getRoleDetails(
      //     userdata?.data?.role
      //   ).unwrap();
      //   return response
      // }

      // console.log(roleDetailsResponse(), " fetchedPermissions roleDetailsResponse")
      // const fetchedPermissions = roleDetailsResponse()?.data // Adjust path as needed!
      // console.log("fetchedPermissions :" + fetchedPermissions);
      setRole(userdata?.data?.role)
      dispatch(addToken({ role: userdata?.data?.role, accessToken: token }));
      localStorage.setItem("authUser", userdata?.data);
      dispatch(addUserInfo({
        id: userdata?.data?._id,
        name: `${userdata?.data?.firstName} ${userdata?.data?.lastName}`,
        email: userdata?.data?.email,
        status: userdata?.data?.status,
      }))
    }
  }, [userdata])
  useEffect(() => {
    if (getRoleDetails) {
      const fetchedPermissions = getRoleDetails?.data?.permissions // Adjust path as needed!
      console.log("fetchedPermissions :" + fetchedPermissions?.permissions);
      dispatch(setPermissions(fetchedPermissions));

    }
  }, [getRoleDetails])
  return <div>Processing login...</div>;
}
