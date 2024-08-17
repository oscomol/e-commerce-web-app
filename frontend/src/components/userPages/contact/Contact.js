import Common from "../common/Common";
import Form from "./Form";
import ToContact from "./ToContact";

const Contact = () => {
    return (
        <Common
            page='Get in touch'
            center={true}
            body={<>
                <ToContact />
                <Form />
            </>}
        />
    );
};

export default Contact;