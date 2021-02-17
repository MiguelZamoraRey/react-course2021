import React from 'react';

import {Link} from 'react-router-dom';
import BadgesListItem from './BadgesListItem';

import "./styles/BadgesListItem.css";

function useSearchBudges(badges){
    const [query, setQuery] = React.useState("");

    //const filteredBadges = badges.filter(badge => {
    //  return `${badge.firstName} ${badge.lastName}`.toLowerCase().includes(query.toLowerCase());
    //})

    //Optimizada con useMemo
    const [filteredBadges, setFilteredBadges] = React.useState(badges);
    
    React.useMemo(() => {
        const result = badges.filter(badge => {
            return `${badge.firstName} ${badge.lastName}`
                .toLowerCase()
                .includes(query.toLowerCase());
        });
        setFilteredBadges(result)
    }, [ badges, query ]);
    //fin optimizacion

    return {query, setQuery, filteredBadges}
}

function BadgesList(props){

    const badges = props.badges;

    const {query, setQuery, filteredBadges} = useSearchBudges(badges);

    if(filteredBadges.length === 0){
        return(
            <div>
                <div className="form-group">
                    <label>Filter Badges</label>
                    <input type="text" className="form-control" 
                        value={query}
                        onChange={(e)=>{
                            setQuery(e.target.value)
                        }}/>
                </div>
                <h3>No badge found</h3>
                <Link className="btn btn-primary" to="/badges/new">Create New Budge</Link>
            </div>
        )
    } else {
        return (
            <div className="Badges__list">
                <div className="Badges__container">
                    <div className="form-group">
                        <label>Filter Badges</label>
                        <input type="text" className="form-control" 
                            value={query}
                            onChange={(e)=>{
                                setQuery(e.target.value)
                            }}/>
                    </div>
                    <ul className="list-unstyled">
                        {filteredBadges.map( (badge) => {
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

export default BadgesList;