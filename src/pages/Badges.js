import React from 'react';
import {Link} from 'react-router-dom';

import logo from '../images/badge-header.svg';
import "./styles/Badges.css";

import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import MiniLoader from '../components/MiniLoader';
import PageError from '../components/PageError';

import api from '../api.js';

class Badges extends React.Component {
    constructor(props){
        super(props)
        console.log("1.constructor")
        this.state = {
            data: undefined,
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        console.log("3.Didmount")
        this.fetchData();

        //TECNICA POLLING --> para evitar el uso de websockets si la carga no es mucha
        //  utilizamos esta tecnica para que todo el mundo pueda ver resultados en 
        //  tiempo real, consiste en hacer get continuamente segun un intervalo
        this.intervalId = setInterval(this.fetchData,5000);
    }

    fetchData = async () => {
        //reiniciamos el estado
        this.setState({loading:true, error:null});
        //llamamos a la fake api
        try {
            const data = await api.badges.list();
            this.setState({loading: false, data: data});
        } catch(error) {
            this.setState({loading: false, error: error});
        }
    }

    componentDidUpdate(prevProps,prevState){
        console.log("5.did update")
        console.log({prevProps:prevProps,prevState:prevState})
        console.log({props:this.props,state:this.state})
    }

    componentWillUnmount(){
        console.log("6.willUnmount");
        clearInterval(this.intervalId);
    }

    render() {
        console.log("2/4.render");

        if(this.state.loading === true && this.state.data === undefined){
            return <PageLoading/>
        }

        if(this.state.error){
            return <PageError error={this.state.error}/>;
        }

        return (
            <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img className="Badges_conf-logo" src={logo} alt="logo"/>
                        </div>
                    </div>
                </div>
                <div className="Badge__container">
                    <div className="Badges__buttons">
                        <Link to="/badges/new" className="btn btn-primary">
                            New Badge
                        </Link>
                    </div>
                    <BadgesList badges={this.state.data}/>
                    {this.state.loading && <MiniLoader/>}
                </div>
            </React.Fragment>
        );
    }
}

export default Badges;