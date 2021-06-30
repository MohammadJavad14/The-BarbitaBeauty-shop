import React, { useState, useEffect } from 'react';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder } from '../actions/orderActions';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

function OrderScreen({ match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    if (!order || successPay || order._id !== Number(orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId, successPay]);

  const successPaymentHandler = () => {
    dispatch(payOrder(orderId));
  };

  const convertNumberToPersian = num => {
    const price = Number(num).toLocaleString('fa-IR');
    return price;
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1> سفارش شماره: {convertNumberToPersian(order._id)}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>مشخصات </h2>

              <p>
                <strong>نام:</strong>&nbsp;
                {order.user.name}
              </p>
              <p>
                <strong>ایمیل:</strong>&nbsp;
                {order.user.email}
              </p>
              <p>
                <strong>آدرس پستی:</strong>&nbsp;
                {order.shippingAddress.country}- {'  '}
                {order.shippingAddress.city}-{order.shippingAddress.address}-
                {'  '}
                {order.shippingAddress.postalCode}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  تحویل داده شده در :&nbsp;
                  {new Date(order.deliveredAt).toLocaleDateString('fa-IR')}
                </Message>
              ) : (
                <Message variant="warning">تحویل داده نشده است. </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>روش پرداخت</h2>
              <p>{order.paymentMethod}</p>
              {order.isPaid ? (
                <Message variant="success">
                  پرداخت شده در :&nbsp;
                  {new Date(order.paidAt).toLocaleDateString('fa-IR')}
                </Message>
              ) : (
                <Message variant="warning">پرداخت انجام نشده است.</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>سفارش ها</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="info">سفارشی وجود ندارد</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          <Row>
                            <Col className="mx-0 px-0 pt-2">
                              {`تعداد: `}&nbsp;
                              {convertNumberToPersian(item.qty)}
                            </Col>
                            <Col className="mx-0 px-0 pt-2">
                              {`جمع کل:`}&nbsp;
                              {convertNumberToPersian(item.qty * item.price)}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>خلاصه سفارش ها</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>محصولات :</Col>
                  <Col>{` ${convertNumberToPersian(
                    order.itemsPrice
                  )}  تومان`}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>هزینه ارسال :</Col>
                  <Col>{` ${convertNumberToPersian(
                    order.shippingPrice
                  )}  تومان`}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>مجموع :</Col>
                  <Col>{`${convertNumberToPersian(
                    order.totalPrice
                  )} تومان `}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  <Button
                    onClick={successPaymentHandler}
                    amount={order.totalPrice}
                  >
                    انتقال به درگاه پرداخت
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderScreen;
