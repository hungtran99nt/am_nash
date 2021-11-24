import React from "react";
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

const ManageAsset = () =>{
    let history = useHistory();
    const HandleRedirectEditAssetPage = () => {
        history.push("/edit/asset/1");
    }
    const HandleRedirectCreateAssetPage = () => {
        history.push("/create/asset");
    }
    return(
        <div>
            <Button onClick={HandleRedirectEditAssetPage}>Edit Asset</Button>
            <Button onClick={HandleRedirectCreateAssetPage}>Create New Asset</Button>
        </div>
    )
}
export default ManageAsset