
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
            <div className="main-wrap">
                <MenuSection/>
                <div className="main-inner">
                    <iframe src="https://www.baidu.com"/>
                </div>
            </div>
        </Fragment>
    );
};

ReactDOM.render(<ViewPage />, document.getElementById('root'));
