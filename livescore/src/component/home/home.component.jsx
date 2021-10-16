import React from 'react';
import './home.style.css';
import { Link } from 'react-router-dom';
import cricket from '../../asset/cric.jpg';
import soccer from '../../asset/soccer.jpg';
import badminton from '../../asset/badminton.jpg';
import Header from '../header/header';
import Footer from '../footer/footer.component';
import Info from '../alert/info.component';
const Home = props => {
    return (
        <div>
            <Header />
            {/* <Info /> */}
            <div className="header-home">Welcome to Live Score App </div>

            <div className="main-home">
                <div className="container-home">
                    <div className="card-home">
                        <div className="face face1">
                            <div className="content">
                                <div className="icon">
                                    <img src={cricket} alt="cricket" width="300px" height="200px" />
                                </div>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content cricket-content">
                                <h3  style={{ color: 'red' }}>
                                    <Link id="cricket" style={{ color: 'darkblue' }}
                                        to={{
                                            pathname: '/dashboard',
                                            liveScore: {
                                                category: 'cricket'
                                            }

                                        }}>Live Score</Link>
                                </h3>
                                <p>Click on live score to get Cricket live scores</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-home">
                        <div className="face face1">
                            <div className="content">
                                <div className="icon">
                                    <img src={soccer} alt="soccer" width="300px" height="200px" />
                                </div>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content">
                                <h3 >
                                    <Link id="soccer" style={{ color: 'darkblue' }} to={{
                                        pathname: '/dashboard',
                                        liveScore: {
                                            category: 'soccer'
                                        }

                                    }}>Live Score</Link>
                                </h3>
                                <p>Click on live score to get Soccer live scores</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-home">
                        <div className="face face1">
                            <div className="content" id="card-content-badminton">
                                <div className="icon">
                                    <img src={badminton} alt="badminton" width="300px" height="200px" />
                                </div>
                            </div>
                        </div>
                        <div className="face face2">
                            <div className="content" >
                                <h3 >
                                    <Link id="badminton" style={{ color: 'darkblue' }}
                                        to={{
                                            pathname: '/dashboard',
                                            liveScore: {
                                                category: 'badminton'
                                            }

                                        }}>Live Score</Link>
                                </h3>
                                <p>Click on live score to get Badminton live scores</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="card-home">
                    <div className="face face1">
                        <div className="content">
                            <div className="icon">
                                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <h3>
                                <a href="https://twitter.com/AdamDipinto" target="_blank">@AdamDipinto</a>
                            </h3>
                            <p>This is where I read news and network with different social groups.</p>
                        </div>
                    </div>
                </div>
                <div className="card-home">
                    <div className="face face1">
                        <div className="content">
                            <div className="icon">
                                <i className="fa fa-twitter-square" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div className="face face2">
                        <div className="content">
                            <h3>
                                <a href="https://twitter.com/AdamDipinto" target="_blank">@AdamDipinto</a>
                            </h3>
                            <p>This is where I read news and network with different social groups.</p>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Home;