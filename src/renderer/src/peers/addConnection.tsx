import { Button } from "../shadcn/components/ui/button";
import * as React from "react";
import { useState } from "react";
import Modal from "./Modal"
import "./addConnection.css";

const ButtonStyle ={
    display: 'flex', 
    alignItems: 'center', // This will ensure vertical centering within the div.
    justifyContent: 'flex-end', // This aligns the button to the right of the div.
    height: '10%', // Set a specific height for the container
    width: '100%',
    paddingTop: '40px',
    
}

const addConnection = () =>{
    const [isModalOpen, setModalOpen] = useState(false);

    // Function to toggle the modal's visibility
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };

    return (
        <div style={ButtonStyle}>
            <Button onClick={toggleModal}>
                + Add Connection
            </Button>
            <Modal isOpen={isModalOpen} onClose={toggleModal} />
        </div>
    );
}

export default addConnection;