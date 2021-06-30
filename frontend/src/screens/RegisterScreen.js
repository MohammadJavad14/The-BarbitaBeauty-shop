import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

import { register } from "../actions/userActions";

function RegisterScreen({ location, history }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("رمز های وارد شده با هم یکسان نستن");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <FormContainer>
      <h1>ورود</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>نام</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="نام را وارد نمایید"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="ایمیل را وارد نمایید"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>رمز عبور</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="رمز عبور را وارد نمایید"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirm">
          <Form.Label>تایید رمز عبور</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="رمز عبور وارد شده را تایید نمایید"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          عضویت
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          از دوستای قدیمی مون هستی؟{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            ورود
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;
