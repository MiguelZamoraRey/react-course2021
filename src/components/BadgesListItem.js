import React from 'react';
import Gravatar from './Gravatar';

import "./styles/BadgesList.css";

function BadgesListItem(props) {
    return (
        <div className="BadgesListItem">
            <Gravatar
            className="BadgesListItem__avatar"
            email={props.badge.email}
            />
        <div>
            <strong>
                {props.badge.firstName} {props.badge.lastName}
            </strong>
            <br />
            <div className="Twitter__name">
                <span className="Twitter__logo"></span>@{props.badge.twitter}
            </div>
            {props.badge.jobTitle}
        </div>
      </div>
    )
}

export default BadgesListItem;