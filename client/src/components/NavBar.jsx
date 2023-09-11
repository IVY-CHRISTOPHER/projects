import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
    const navigate = useNavigate();
    const LogoutUser = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then((res) => {
                console.log(res);
                navigate('/') 
            })
            .catch(err => console.log(err))
    }
    return (
        <>
            <nav>
                <div className="p-2">
                    <div className="d-flex justify-content-between">
                        <h1>Logo</h1>
                        <h1 className="">TownSquareConnect</h1>
                        <button onMouseLeave={(e) => e.target.className = 'h-50 btn border border-danger text-white'} 
                        onMouseOver={(e) => e.target.className = "h-50 btn border border-0 text-danger"} 
                        className="h-50 btn border border-danger text-white" onClick={LogoutUser}>LogOut</button>
                    </div>
                    <div className="d-flex mt-3" style={{
                        gap: '0px'
                    }}>
                    <Link to={"/homepage"} onMouseLeave={(e) => {e.target.className = "btn text-white w-50 border border-primary border-end-0"}} 
                    onMouseOver={(e) => {e.target.className = "btn text-primary w-50 border border-0"}} 
                    className="btn text-white w-50 border border-primary border-end-0">Home</Link> 

                    <Link to={'/events'} onMouseLeave={(e) => {e.target.className = "btn text-white w-50 border border-primary border-start-0"}} 
                    onMouseOver={(e) => {e.target.className = "btn text-primary w-50 border border-0"}} 
                    className="btn text-white w-50 border border-primary border-start-0">Events</Link>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default NavBar;
