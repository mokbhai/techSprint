import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import URL from "../../../apiconfig";

const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/adminlogin');
      return;
    }

    const validateToken = async () => {
      try {
        await axios.get(`${URL}/api/auth`, {
          headers: { Authorization:token },
        });
        setIsLoading(false);
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/adminlogin');
      }
    };

    validateToken();
  }, [navigate]);

  return isLoading;
};

export default useAuth;
