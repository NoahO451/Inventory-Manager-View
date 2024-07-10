import Cookies from 'js-cookie';
import { useAuth0 } from "@auth0/auth0-react";
import { useGetUser } from '../api/get-user';

export default function GetData() {  
  const { isAuthenticated, isLoading } = useAuth0();

  const userUuid = 'e7bd758c-e8bb-45f0-ab4d-e7a331b60729';
  const getUserQuery = useGetUser({userUuid});

  const handle = () => {
    const token = Cookies.get('auth_token');
    console.log(token)
  }

  const handleGet = () =>{
    console.log(getUserQuery.data)
  }

  if (getUserQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <h1>LOADING</h1>
      </div>
    );
  }


  return (
    <>
    <button className="button__logout" onClick={handle}>
      Log Auth Token
    </button>
    <button className="mx-4" onClick={handleGet}>
      Get User Data
    </button>
    </>
  );
  }
  