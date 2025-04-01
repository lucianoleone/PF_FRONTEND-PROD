import { Link } from "react-router-dom"
import '../styles/global.css'
const StartButton = () =>{
    return(
<div className="brand-logo">
    <Link className={"btn-dark"} to={'/register'}>
        COMENZAR
    </Link>
    <button className="btn-nav">
        <i className="bi bi-list"></i>
    </button>
</div>)
}

export default StartButton;
