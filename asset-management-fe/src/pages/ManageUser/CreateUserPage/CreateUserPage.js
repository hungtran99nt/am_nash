import {Button, ButtonGroup, Col, Form, FormCheck, Row, ToggleButton} from "react-bootstrap";
import {Formik,Field} from 'formik';
import * as Yup from "yup";
const validateForm = Yup.object().shape({
    firstname:Yup.string().required("Required!"),
    lastname:Yup.string().required("Required!"),
    birthdate:Yup.date()
        .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
        .required("Required"),
    joineddate:Yup.date()

        .required("Required"),

    type:Yup.number().required("Required!")
})
const initialValues = {firstname: "", lastname: "",birthdate:"",joineddate:"",type:""};
const submit = values => {
    console.log(values)
}
const CreateUserPage = () => {
    return (
        <div className="app-create">
            <div className="row">
                <div className="col-lg-2">Left</div>
                <div className="col-lg-8 ">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validateForm}
                        onSubmit={submit}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleSubmit,
                          }) => (
                            <Form onSubmit={handleSubmit}>
                                <div className="app-content__title">Create New User</div>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">First Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="firstname"
                                            id="firstname"
                                            value={values.firstname}
                                            onChange={handleChange}
                                            isInvalid={touched.firstname && errors.firstname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstname}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Last Name</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            type="text"
                                            name="lastname"
                                            id="lastname"
                                            onChange={handleChange}
                                            value={values.lastname}
                                            isInvalid={touched.lastname && errors.lastname}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastname}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Date Of Birth</Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="birthdate"
                                            type="date"
                                            value={values.birthdate}
                                            onChange={handleChange}
                                            isInvalid={touched.birthdate && errors.birthdate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.birthdate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Gender
                                    </Form.Label>
                                    <Col sm="6">
                                            <div className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="Female"
                                                    name="group1"
                                                    type={"radio"}
                                                    id={`inline-1`}
                                                    checked={true}

                                                />
                                                <Form.Check
                                                    inline
                                                    label="Male"
                                                    name="group1"
                                                    type={"radio"}
                                                    id={`inline-2`}
                                                />
                                            </div>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">
                                        Joined Date
                                    </Form.Label>
                                    <Col sm="6">
                                        <Form.Control
                                            name="joineddate"
                                            type="date"
                                            value={values.joineddate}
                                            onChange={handleChange}
                                            isInvalid={touched.joineddate && errors.joineddate}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.joineddate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="2">Type</Form.Label>
                                    <Col sm="6">
                                        <Form.Select>
                                            <option value="0">select something</option>
                                            <option value="1">Staff</option>
                                            <option value="2">Admin</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.joineddate}
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className="col-lg-2">Right</div>
            </div>
        </div>
    )
}
export default CreateUserPage