import {useState} from "react"
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import cookie from 'js-cookie';

function Profile() {
    useEffect(() => {
            const isLoggedIn = cookie.get('token');
            if (!isLoggedIn) {
                // Redirect to a protected route or display appropriate content if logged in
                useNavigate('/login'); // Replace with your protected route path
            }
        }, []);
    
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
      
    // Get the user ID from somewhere (e.g., cookies, localStorage)
    const userId = axios.get("http://localhost:3000/getData",{
        
    })
    .then((data)=>{
        userID = data
    })
    .catch((err)=>{
        console.log(err.message)
    })
      
        // Fetch user data on component mount
    useEffect(() => {
    const fetchData = async () => {
    setIsLoading(true);
    try {
    const response = await axios.get(`http://localhost:your-port/api/users/${userId}`); // Replace with your endpoint
    setUserData(response.data);
    } catch (err) {
        setError(err);
    } finally {
        setIsLoading(false);
    }
    };
      
          fetchData();
        }, [userId]);
      
        if (isLoading) {
          return <div>Loading user data...</div>;
        }
      
        if (error) {
          return <div>Error fetching user data: {error.message}</div>;
        }
      
        if (!userData) {
          return <div>User not found.</div>;
        }
    
    return <>

    </>
}

export default Profile