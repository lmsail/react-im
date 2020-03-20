import React, { Component } from 'react'

import ReactImg from '../../../assets/images/about/react.png'
import AntdImg from '../../../assets/images/about/antd.png'
import ReduxImg from '../../../assets/images/about/redux.png'

export default class About extends Component {
    render() {
        return (
            <div style={{ height: "100%" }}>
                <h2 className="set-title">关于</h2>
                <section className="set-content">
                    <div className="about">
                        <div className="about-item">
                            <h3>技术选型</h3>
                            <img src={ReactImg} width="60" alt="react-logo" />
                            <span>+</span>
                            <img src={AntdImg} width="60" alt="antd-logo" />
                            <span>+</span>
                            <img src={ReduxImg} height="60" alt="redux-logo" />
                        </div>
                        <div className="about-item">
                            <h3><span role="img" aria-label="🌈">🌈</span>作者自述</h3>
                            <div className="author" style={{ fontSize: 16 }}>
                                一个多年从事后端的 <b>Ordinary Developers</b>，主攻<span>PHP</span>, 先后学习<span>Python</span>、<span>Go</span>等语言，
                                本人前端技术盏一直处于<span>Jquery</span>阶段，自接触<span>Vue</span>后，被前端新技术的焕然一新所吸引，自接触<span>React</span>后，再次眼前一亮，
                                故决定写点东西，从而本项目自此`出生`，本项目纯前端，后端根据各自技术盏自由组合
                            </div>
                        </div>
                        <div className="about-item">
                            <h3><span role="img" aria-label="🤝">🤝</span>GitHub</h3>
                            <div style={{ fontSize: 16 }}>
                                Github仓库：<a href="https://github.com/MarichMarck/react-im" rel="noopener noreferrer" target="_blank">https://github.com/MarichMarck/react-im</a>
                            </div>
                        </div>
                        <div className="about-item">
                            <h3><span role="img" aria-label="🌱">🌱</span>其它项目</h3>
                            <div style={{ fontSize: 16 }}>
                                <div style={{ marginBottom: 10 }}>
                                    Gin-blog（go + gin + gorm简洁博客）<br/><a rel="noopener noreferrer" href="https://github.com/MarichMarck/gin-lmsail" target="_blank">https://github.com/MarichMarck/gin-lmsail</a>
                                </div>
                                <div style={{ marginBottom: 10 }}>
                                    laravel-blog（laravel5.8支持MarkDown博客）<br/>
                                    <a rel="noopener noreferrer" href="https://github.com/MarichMarck/laravel-lmsail" target="_blank">https://github.com/MarichMarck/laravel-lmsail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}