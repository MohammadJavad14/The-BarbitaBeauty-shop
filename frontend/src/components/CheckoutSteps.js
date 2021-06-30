import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>ورود</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>ورود</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>مشخصات پستی</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>مشخصات پستی</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>انتخاب روش پرداخت</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>انتخاب روش پرداخت</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>سفارش ها</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>سفارش ها</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
