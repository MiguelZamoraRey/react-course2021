import React from 'react';

import {Link} from 'react-router-dom';
import Gravatar from './Gravatar';

import "./styles/BadgesList.css";

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
                <ul className="list-unstyled">
                    {this.props.badges.map( (badge) => {
                        return (
                            <li key={badge.id} className="BadgesListItem">
                                <Gravatar
                                    className="BadgesListItem__avatar"
                                    email={badge.email}
                                />
                                <div>
                                    <div><strong>{badge.firstName} {badge.lastName}</strong></div>
                                    <div className="Twitter__name">
                                    <span className="Twitter__logo"></span>@{badge.twitter}
                                    </div>
                                    <div>{badge.jobTitle}</div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            );
        }
    }
}

export default BadgesList;