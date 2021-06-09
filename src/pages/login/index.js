
import './index.scss'
import 'antd/dist/antd.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Button, DatePicker, version } from 'antd'

ReactDOM.render(
    <div className="App">
        <h1>antd version: {version}</h1>
        <DatePicker />
        <Button type="primary" style={{ marginLeft: 8 }}>
            Primary Button
        </Button>
    </div>,
    document.getElementById("root")
);
