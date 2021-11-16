import {Button} from "react-bootstrap";
import"../../assets/styles/main.css"
const Home = () =>{
    return (
        <div>
            <Button className="btn-save" >Save</Button><br/>
            <Button className="btn-save" >Disable</Button><br/>
            <Button className="btn-cancel">Cancel</Button><br/>
        </div>
    )
}
export default Home
