import { useNavigate } from "react-router-dom";
import AddContact from "./AddContact";

const AddContactWrapper = (props) => {
  let navigate = useNavigate();
  return <AddContact {...props} navigate={navigate} />;
};

export default AddContactWrapper;
