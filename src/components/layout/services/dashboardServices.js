import axios from 'axios';

export const getDashboardStats = async () => {
    const token = localStorage.getItem("token"); 

    const response = await axios.get(
    'https://9126c98e-e2e1-4608-8843-5de80d6148b8-00-12rx1cwtt852y.spock.replit.dev/api/progress/dashboard-stats',
    {
        headers: {Authorization: `Bearer ${token}`}
    }
);
return response.data;
};