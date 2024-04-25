import {useState} from 'react';
import { Button } from "../shadcn/components/ui/button";
import "./Modal.css"; // make sure to create this CSS file

type ModalProps = {
    isOpen: boolean;
    onClose: () => void; // assuming no parameters are passed to the onClose function
  };

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [peerAddress, setPeerAddress] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isError, setIsError] = useState(false); 

    const correctPeerAddresses = [
        "/dnsaddr/bootstrap.libp2p.io/p2p/QmExampleAddress1",
        "/ip4/147.75.109.213/udp/4001/quic/p2p/QmExampleAddress2",
        "/example"
      ];
    const handleAddConnection = () => {
    
        const success = correctPeerAddresses.includes(peerAddress);
        setIsError(!success);
        if (success) {
            setFeedbackMessage("Success: Connection added!");
        } else {
            setFeedbackMessage("Connection failed: Peer address does not exist.");
            
        }
    };


  const handleClose = () => {
    // Reset everything to default state
    setPeerAddress('');
    setFeedbackMessage('');
    setIsError(false);
    onClose(); // Call the onClose prop
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleAddConnection();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">Add connection</h5>
          <button onClick={handleClose} className="close-button">&times;</button>
        </div>
        <div className="modal-body">
          <p>Insert the peer address you want to connect to.</p>
          <input type="text" className="modal-input" placeholder="Peer address" value={peerAddress}
            onChange={e => setPeerAddress(e.target.value)} onKeyDown={handleKeyDown}/>
          <div className="modal-example">Example: /dnsaddr/bootstrap.libp2p.io/p2p/Qm...</div>
          <label className="modal-checkbox">
            <input type="checkbox" />
            Add to the permanent peering configuration
          </label>
          {feedbackMessage && (
            <div className={`modal-feedback ${isError ? 'error' : ''}`}>
                {feedbackMessage}
            </div>
            )}
        </div>
        <div className="modal-footer">
            <Button className="modal-button modal-button-secondary" onClick={handleClose}>Cancel</Button>
            <Button className="modal-button modal-button-primary" onClick={handleAddConnection}>Add</Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
