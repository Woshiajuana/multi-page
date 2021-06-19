
import 'antd/dist/antd.min.css'
import './index.scss'

import React, { Fragment, useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import MenuSection from 'src/components/react/MenuSection'
import NavBar from 'src/components/react/NavBar'
import { createBrowserHistory, createHashHistory } from 'history'

const history = createHashHistory();

const ViewPage = () => {
    const initSrc = window.location.hash.substring(1) || 'http://test.owulia.com/';
    const [ src, setSrc ] = useState(initSrc);
    const iframeRef = useRef(null);
    useEffect(() => history.listen((res) => {
        console.log(res);
        const { pathname } = res.location;
        setSrc(pathname);
    }), []);
    return (
        <Fragment>
            <NavBar/>
            <div className="main-wrap">
                <MenuSection history={history}/>
                <div className="main-inner">
                    <iframe ref={iframeRef} src={src}/>
                </div>
            </div>
        </Fragment>
    );
};

ReactDOM.render(<ViewPage />, document.getElementById('root'));
