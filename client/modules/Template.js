import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
        <div>
          <header>
            <div id="page-top" className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <div className="header-content">
                            <div className="header-content-inner">
                                <h1>Swag is an app that will blow your fucking mind</h1>
                                <a href="/userLogin" className="btn btn-outline btn-xl page-scroll">Start Now for Free!</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-5">
                        <div className="device-container">
                            <div className="device-mockup iphone6_plus portrait white">
                                <div className="device">
                                    <div className="screen">
                                        <img src="/img/demo-screen-1.jpg" className="img-responsive" alt=""/>
                                    </div>
                                    <div className="button">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </header>
            <section id="features" className="features">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="section-heading">
                                <h2>Unlimited Features, Unlimited Fun</h2>
                                <p className="text-muted">Check out what you can do with this app theme!</p>
                                <hr/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="device-container">
                                <div className="device-mockup iphone6_plus portrait white">
                                    <div className="device">
                                        <div className="screen">
                                            <img src="/img/demo-screen-1.jpg" className="img-responsive" alt=""/> </div>
                                        <div className="button">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="feature-item">
                                            <i className="icon-screen-smartphone text-primary"></i>
                                            <h3>Device Mockups</h3>
                                            <p className="text-muted">Ready to use HTML/CSS device mockups, no Photoshop required!</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="feature-item">
                                            <i className="icon-camera text-primary"></i>
                                            <h3>Flexible Use</h3>
                                            <p className="text-muted">Put an image, video, animation, or anything else in the screen!</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="feature-item">
                                            <i className="icon-present text-primary"></i>
                                            <h3>Free to Use</h3>
                                            <p className="text-muted">As always, this theme is free to download and use for any purpose!</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="feature-item">
                                            <i className="icon-lock-open text-primary"></i>
                                            <h3>Open Source</h3>
                                            <p className="text-muted">Since this theme is MIT licensed, you can use it commercially!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="cta">
                <div className="cta-content">
                    <div className="container">
                        <h2>Tell us what we can be building for you.<br/>Honestly.</h2>
                        <NavLink to="/boards" className="btn btn-outline btn-xl page-scroll">Browse around!</NavLink>
                    </div>
                </div>
                <div className="overlay"></div>
            </section>
        </div>
        
    )
  }
})
