import React from "react";
import { Link } from "react-router-dom";

const Readme = () => <div style={{height: '100vh', background: 'red', overflow: 'auto'}}>
    <h1 style={{position: 'fixed', top: '50vh', color: '#fff'}}><Link to="/readme">去readme</Link></h1>
    <div style={{height: '400vh', background: 'blue', }}>
        
    </div>
</div>;

export default Readme;
