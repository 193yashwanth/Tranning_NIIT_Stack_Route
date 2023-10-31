import React from "react";
class Contact extends React.Component {
    render() {
        return (
          <>
            <h1>Contact</h1>
            <form style={{display: "flex"}}>
                <label>
                    Name:
                    <input type="text" name="name" />
                    Phone Number:
                    <input type="number" name="phonenumber"/>
                    Email:
                    <input type="text" name="email" />
                </label>
                <input type="submit" value={"submit"} />
            </form>
          </>
        );
    }
}
export default Contact;
