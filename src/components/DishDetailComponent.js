import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  if (comments != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">
          {comments.map(cmt => {
            return (
              <li>
                <p>{cmt.comment}</p>
                <p>
                  -- {cmt.author} ,{' '}
                  {new Intl.DateTimeFormat('en', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(new Date(Date.parse(cmt.date)))}
                </p>
              </li>
            );
          })}
        </ul>
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }
}

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmitComment(event) {
    this.toggleModal;
    alert('Rating: ' + this.rating.value);
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Input type="select" name="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="name">Your Name</Label>
                <Input type="text" id="rating" name="rating" />
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="comment">Your Comment</Label>
                <Col>
                  <Input type="textarea" id="comment" name="comment" rows="6" />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const DishDetail = props => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={props.dish} />
          <RenderComments comments={props.comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
