import React from 'react';

import header from '../images/platziconf-logo.svg';
import "./styles/BadgeEdit.css";

import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';

import PageLoading from '../components/PageLoading';

import api from '../api.js';

class BadgeEdit extends React.Component {
    state = { 
        loading: true,
        error:null,
        form : {
            firstName:'',
            lastName:'',
            email:'',
            jobTitle:'',
            twitter:'',
        } 
    };

    componentDidMount(){
        this.fetchData()
    }

    fetchData = async (e) =>{
        try {
            const data = await api.badges.read(this.props.match.params.badgeId);
            console.log(data)
            this.setState({loading:false, form: data})
        }catch(err){
            this.setState({loading:false, error: err})
        }
    }

    handleChange = (e) => {
        this.setState({
            form : {
                ...this.state.form,
                [e.target.name]: e.target.value}
        });
    }

    handleSubmit = async (e) =>{
        e.preventDefault();
        this.setState({loading:true});
        try {
            await api.badges.update(this.props.match.params.badgeId, this.state.form);
            this.setState({loading:false});
            //if all is ok go to badges
            this.props.history.push('/badges')
        } catch(err) {
            this.setState({loading:false,error:err});
        }
    }

    render() {
        if(this.state.loading === true){
            return <PageLoading/>
        }

        return (
            <React.Fragment>
                <div className="BadgeEdit__hero">
                    <img className="BadgeEdit__hero-image img-fluid" src={header} alt="Logo"/>
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
                            <h1>Edit Attendant</h1>
                            <BadgeForm 
                                onChange={this.handleChange} 
                                formValues={this.state.form}
                                onSubmit={this.handleSubmit}
                                error={this.state.error}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeEdit;