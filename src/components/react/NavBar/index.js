
import React from 'react'
import { PageHeader, Button, Descriptions } from 'antd'

import './index.scss'

export default function NavBar() {
    return (
        <PageHeader
            className="site-page-header"
            ghost={false}
            title="Title"
            subTitle="This is a subtitle"
            extra={[
                <Button key="3">Operation</Button>,
                <Button key="2">Operation</Button>,
                <Button key="1" type="primary">
                    Primary
                </Button>,
            ]}
        />
    );
};
