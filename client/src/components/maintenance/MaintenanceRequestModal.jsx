import Modal from "../ui/Modal"
import RequestHeader from "./RequestHeader"
import RequestInfo from "./RequestInfo"
import RequestNotes from "./RequestNotes"

export default function MaintenanceRequestModal({ request, onClose }) {
  return (
    <Modal onClose={onClose}>
      <RequestHeader request={request} onClose={onClose} />
      <RequestInfo request={request} />
      <RequestNotes request={request} />
    </Modal>
  )
}
