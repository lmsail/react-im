import React, { Component } from 'react'
import { Input, Row, Col, Button } from 'antd'

const { Search } = Input
export default class InputSearch extends Component {
    render() {
        return (
            <div>
                <Row gutter={[8, 8]}>
                    <Col span={20}>
                        <Search placeholder="搜索好友昵称" className="input-search" onSearch={value => console.log(value)} />
                    </Col>
                    <Col span={4}>
                        <Button icon="plus" className="btn-plus" />
                    </Col>
                </Row>
            </div>
        )
    }
}