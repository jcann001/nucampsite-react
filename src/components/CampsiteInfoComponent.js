import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { render } from "@testing-library/react";
// import { Modal } from "bootstrap";
import { Control, LocalForm, Errors } from "react-redux-form";


    function RenderCampsite({campsite}) {
        return(
            <div class="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                    <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    function RenderComments({comments}) {
        if(comments){
            return (
                <div class="col-md-5">
                    <h4>Comments</h4>
                    {comments.map(comment => <div key={comment.id}> {comment.text} </div>)}
                    {comments.map(comment => <div key={comment.id}> {comment.author} {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))} </div>)}
                    
                    <CommentForm />
                </div>
            )
        }
    }

    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                     <div className="row">
                     <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                    <div className="row">
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
                );
            } return <div />;
            
    }

    class CommentForm extends Component {
        constructor(props) {
            super(props);
    
            this.state = {
                rating:"1",
                author:"",
                text:"",
              isModalOpen: false,
              touched: {
                rating: false,
                author: false,
                text: false
                
            }
            };

            this.toggleModal = this.toggleModal.bind(this);
            // this.handleInputChange = this.handleInputChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        validate(rating, author, text){
            const errors = {
                rating: "",
                author: "",
                text: ""
            };

            if(this.state.touched.author){
            if(author.length > 2){
                errors.author="Must be at least 2 characters."
            } else if (author.length > 15) {
                errors.author="Must be less than 16 characters"
            }
        }

            return errors;
        }
    
        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen,

            });
        }
    
        handleSubmit(values) {
            alert(`Current State is: ${JSON.stringify(values)}`);
            console.log(`Current State is: ${JSON.stringify(values)}`);
            this.toggleModal();
        }

        handleBlur = (field) => () => {
            this.setState({
                touched: {...this.state.touched, [field]: true}
            });
        }


        render(){
            const errors = this.validate(this.state.rating, this.state.author, this.state.text);  
            return(
                <React.Fragment>
                <Button onClick={this.toggleModal} class="fas fa-pencil-alt fa-lg" boolean="outline" outline="secondary">Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select className="form-control" model=".rating" name="rating" id="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                            </Control.select>
                        </div>
                        <div className="form-group">
                            <Label htmlFor="author">Your Name</Label> 
                            <Control.text className="form-control" model=".author" id="author" name="author"  invalid={errors.author} onBlur={this.handleBlur("author")} />
                        </div>
                        <div className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".text" className="form-control" rows="6" name="text" id="text" />
                        </div>
                            
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                    </LocalForm>
                </ModalBody>
                </Modal>
                </React.Fragment>
                );
        }
    }


export default CampsiteInfo;