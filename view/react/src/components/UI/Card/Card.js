import React from 'react';

const Card = (props) => {
    return (
        <div className="card">
            <h5 className="card-header">{props.title}</h5>
            {props.children}
        </div>
    );
};

export default Card;