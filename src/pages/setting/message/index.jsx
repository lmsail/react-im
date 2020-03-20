import React, { Component } from 'react'

export default class MessageSetting extends Component {
    render() {
        return (
            <div style={{ height: "100%" }}>
                <h2 className="set-title">消息设置</h2>
                <section className="set-content">
                    <div className="set-info">
                        This Is Message Setting Page!
                    </div>
                </section>
            </div>
        )
    }
}