
import 'antd/dist/antd.min.css'
import './index.scss'

import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import MenuSection from 'src/components/react/MenuSection'
import NavBar from 'src/components/react/NavBar'

const ViewPage = () => {
    return (
        <Fragment>
            <NavBar/>
            <MenuSection/>
        </Fragment>
    );
};

ReactDOM.render(<ViewPage />, document.getElementById('root'));
