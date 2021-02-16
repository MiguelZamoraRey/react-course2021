import React from 'react';

import header from '../images/platziconf-logo.svg';
import "./styles/BadgeNew.css";

import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';

import api from '../api.js';

class BadgeNew extends React.Component {
    state = { 
        loading: false,
        error:null,
        form : {
            firstName:'',
            lastName:'',
            email:'',
            jobTitle:'',
            twitter:'',
        } 
    };

    handleChange = (e) => {
        this.setState({
            form : {
                ...this.state.form,
                [e.target.name]: e.target.value}
        });
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        this.setState({loading:true})
        try {
            this.setState({loading:false});
            await api.badges.create(this.state.form)
        } catch(err) {
            this.setState({loading:false,error:err});
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="BadgeNew__hero">
                    <img className="BadgeNew__hero-image img-fluid" src={header} alt="Logo"/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge 
                                firstName={this.state.form.firstName || 'FIRST_NAME'} 
                                lastName={this.state.form.lastName || 'LAST_NAME'} 
                                avatarUrl="https://www.mzrdeveloper.com/static/media/profile.7925a9ab.jpeg" 
                                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}  
                                email={this.state.form.email || 'EMAIL'} 
                                twitter={this.state.form.twitter} />
                        </div>
                        <div className="col-6">
                            <BadgeForm 
                                onChange={this.handleChange} 
                                formValues={this.state.form}
                                onSubmit={this.handleSubmit}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeNew;