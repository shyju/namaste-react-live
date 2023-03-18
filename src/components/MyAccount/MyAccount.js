import { Tab, Tabs } from "react-bootstrap"

import { Favourites } from "../Favourites/Favourites";
import { Order } from "../Orders/Order"
import './MyAccount.css';

export const MyAccount = () => {
    return (
        <div className="my-account">
            <Tabs className="mb-3" justify>
                <Tab eventKey="orders" title="Orders">
                    <Order/>
                </Tab>
                <Tab eventKey="favourites" title="Favourites">
                    <Favourites/>
                </Tab>
            </Tabs>
        </div>
    )
}