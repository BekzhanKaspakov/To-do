import { Row, Col } from "react-bootstrap";
import Login from "components/login.component";
import Register from "components/register.component";

const Authentication = () => {
  return (
    <Row>
      {/* Register */}
      <Col xs={12} sm={12} md={6} lg={6}>
        <Register />
      </Col>

      {/* Login */}
      <Col xs={12} sm={12} md={6} lg={6}>
        <Login />
      </Col>
    </Row>
  );
};

export default Authentication;
