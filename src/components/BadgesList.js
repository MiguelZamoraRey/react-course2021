import React from 'react';

import {Link} from 'react-router-dom';
import BadgesListItem from './BadgesListItem';

import "./styles/BadgesListItem.css";

class BadgesList extends React.Component {
    render() {
        if(this.props.badges.lenght === 0){
            return(
                <div>
                    <h3>No badge found</h3>
                    <Link className="btn btn-primary" to="/badges/new"></Link>
                </div>
            )
        } else {
            return (
                <div className="Badges__list">
                    <div className="Badges__container">
                        <ul className="list-unstyled">
                            {this.props.badges.map( (badge) => {
                                return (
                                    <li key={badge.id}>
                                        <Link className="text-reset text-decoration-none" to={`/badges/${badge.id}`}>
                                            <BadgesListItem badge={badge}/>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            );
        }
    }
}

export default BadgesList;