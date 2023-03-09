import { Tab, Tabs } from "react-bootstrap"
import { Order } from "../Orders/Order"

import './MyAccount.css';

export const MyAccount = () => {
    return (
        <div className="my-account">
            <Tabs>
                <Tab eventKey="orders" title="Orders">
                    <Order/ >
                </Tab>
                <Tab eventKey="favourites" title="Favourites" disabled>
                    
                </Tab>
            </Tabs>
        </div>
    )
}