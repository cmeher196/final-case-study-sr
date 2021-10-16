import React, { useEffect, useState } from 'react';
import './dashboard.style.css';
import axios from "axios";
import Table from '../display/cricket-table';
import Header from '../header/header';
import { useHistory } from 'react-router-dom';
import NoDataFound from '../no-data/no-data.component';
import Footer from '../footer/footer.component';
import Info from '../alert/info.component';
const Dashboard = props => {

    const [liveScoreData, setLiveScoreData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [category, setCategory] = useState('');
    const history = useHistory();
    const [showModal, setShowModal] = useState({
        show: false,
        heading: "",
        body: ""
    });

    useEffect(() => {
        // console.log("param props", props);

        let url = '';
        if (props.location.liveScore == undefined) {
            url = `https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=cricket`;
        }
        else {
            setCategory(props.location.liveScore.category);
            url = `https://livescore6.p.rapidapi.com/matches/v2/list-live?Category=${props.location.liveScore.category}`
        }
        axios.get(url, {
            headers: {
                'x-rapidapi-key': 'bc6fcb967emsh2594cd4c223769dp13c327jsnfd7bdc549ad6'
                // bc6fcb967emsh2594cd4c223769dp13c327jsnfd7bdc549ad6--back up
                //7b3b96f36amsh89c0003430acf7ap19bfeajsn41ee646c782
            }
        }).
            then(res => {
                // setIsLoading(true);
                // console.log(res.data.Stages);
                let data = res.data.Stages;
                setLiveScoreData(data)
                setIsLoading(false);
            }).catch(error =>
                console.error(error)

            );
    }, [])

    const favouriteGame = liveGameId => {
        if (sessionStorage.getItem('userId') !== null || undefined) {
            // console.log('live id', liveGameId);
            let newFavouriteGame = liveScoreData.filter(ele => ele.Sid === liveGameId);
            let favouriteData = {
                createdBy: sessionStorage.getItem('userId'),
                gameId: newFavouriteGame[0].Sid,
                gameInfo: newFavouriteGame[0].Events[0].ErnInf,
                firstTeam: newFavouriteGame[0].Events[0].T1[0].Nm,
                firstTeamScoreOne: newFavouriteGame[0].Events[0].Tr1C1 ? `${newFavouriteGame[0].Events[0].Tr1C1} / ${newFavouriteGame[0].Events[0].Tr1CW1}` : `${newFavouriteGame[0].Events[0].Tr1}`,
                firstTeamScoreTwo: newFavouriteGame[0].Events[0].Tr1C2 ? `${newFavouriteGame[0].Events[0].Tr1C2} / ${newFavouriteGame[0].Events[0].Tr1CW2}` : '',
                gameCategory: category ? category : 'cricket',
                gameTitle: newFavouriteGame[0].Snm,
                secondTeam: newFavouriteGame[0].Events[0].T2[0].Nm,
                secondTeamScoreOne: newFavouriteGame[0].Events[0].Tr2C1 ? `${newFavouriteGame[0].Events[0].Tr2C1} / ${newFavouriteGame[0].Events[0].Tr2CW1}` : `${newFavouriteGame[0].Events[0].Tr2}`,
                secondTeamScoreTwo: newFavouriteGame[0].Events[0].Tr2C2 ? `${newFavouriteGame[0].Events[0].Tr2C2} / ${newFavouriteGame[0].Events[0].Tr2CW2}` : '',
                result: newFavouriteGame[0].Events[0].ECo ? newFavouriteGame[0].Events[0].ECo : `${newFavouriteGame[0].Events[0].T1[0].Nm} scored ${newFavouriteGame[0].Events[0].Tr1} & ${newFavouriteGame[0].Events[0].T2[0].Nm} scored ${newFavouriteGame[0].Events[0].Tr2}`
            }

            // console.log('favourite game', newFavouriteGame);
            // console.log('data to be stored,,,', favouriteData)

            axios.post(`http://localhost:8081/api/v1/favourite`, favouriteData, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            }).then(res => {
                // console.log(res.data)
                setShowModal(true);
                setShowModal({
                    ...showModal,
                    show: true,
                    heading: "Info",
                    body: res?.data
                })
                // alert(res.data);

            })
                .catch(err => {
                    setShowModal({
                        ...showModal,
                        show: true,
                        heading: "Error",
                        body: err?.response?.data
                    })
                    // console.log(err);
                    // alert(err.response.data);
                })

        }
        else {
            setShowModal({
                ...showModal,
                show: true,
                heading: 'Warning!!',
                body: "You aren't Live score User, Please Login/ Register"
            });
            // alert("You aren't Live Score App user, Please Login or Register");
            // history.push('/login');

        }
    }


    const closeModal = () => {

        if (sessionStorage.length === 0) {
            console.log('i m if');
            history.push('/login');
            setShowModal({
                ...showModal,
                show: false,
                heading: '',
                body: ''
            });
        }

        else{
            console.log('i m else');
            setShowModal({
                ...showModal,
                show: false,
                heading: '',
                body: ''
            });
        }
        


    }

    const loading = (
        <div class="spinner-border text-success" role="status">
            <span>Loading...</span>
        </div>
    )

    const noDataToDisplay = (
        <div class="alert alert-danger" role="alert">
            No Live scrore to display!!
        </div>
    )


    return (
        // <div classNameName="main-container">


        // <div className="card-container">
        //     <p className="head">
        //         Cricket World Cup 2019
        //         <span className="right day">Yesterday</span></p><br />
        //     <table className="table">
        //         <tr>
        //             <td> <img className="flag" src="https://i.imgur.com/717RRSi.png" alt="" />&emsp;<span>IND</span><br /><br />
        //                 <p className="score">336/5</p>
        //                 <p className="overs">(50)</p>
        //             </td>
        //             <td className="right1"> <span>PAK</span>&emsp;<img className="flag" src="https://i.imgur.com/ZxbFH9r.png" alt="" /><br /><br />
        //                 <p className="score pak">212/6</p>
        //                 <p className="overs pak">(40)</p>
        //             </td>
        //         </tr>
        //     </table>
        //     <center>
        //         <p className="target"><u>Target 302</u></p>
        //         <p className="res">India won by 89 runs (DLS method)</p>
        //         <p className="match">ODI 22 of 38</p>
        //     </center>
        // </div>
        // <div className="card-container">
        //     <p className="head">
        //         Cricket World Cup 2019
        //         <span className="right day">Yesterday</span></p><br />
        //     <table className="table">
        //         <tr>
        //             <td> <img className="flag" src="https://i.imgur.com/717RRSi.png" alt="" />&emsp;<span>IND</span><br /><br />
        //                 <p className="score">336/5</p>
        //                 <p className="overs">(50)</p>
        //             </td>
        //             <td className="right1"> <span>PAK</span>&emsp;<img className="flag" src="https://i.imgur.com/ZxbFH9r.png" alt="" /><br /><br />
        //                 <p className="score pak">212/6</p>
        //                 <p className="overs pak">(40)</p>
        //             </td>
        //         </tr>
        //     </table>
        //     <center>
        //         <p className="target"><u>Target 302</u></p>
        //         <p className="res">India won by 89 runs (DLS method)</p>
        //         <p className="match">ODI 22 of 38</p>
        //     </center>
        // </div>

        // </div>

        <div className="container-dashboard">
            <Header />

            <div className="wrapper">
                <div className="header">Live Score for {props.location.liveScore ? props.location.liveScore.category : 'cricket'} </div>
                <div >
                    <div className="cards_wrap">
                        {isLoading === 'true' ? loading :
                            liveScoreData.length > 0 ?
                                liveScoreData.map(data =>
                                    <div className="card_item" key={data.Sid}>

                                        <div className="card_inner">
                                            <div className="role_name">{data.Snm}</div>
                                            <div className="real_name">{data.Events[0].ErnInf}</div>

                                            <Table data={data} category={category} />

                                            <div>
                                                <span style={{ color: 'antiquewhite', fontSize: '12px' }}>{data.Events[0].ECo}</span>
                                            </div>
                                            <div style={{ marginTop: '30px' }}>
                                                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => favouriteGame(data.Sid)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                                    </svg></button>
                                            </div>
                                        </div>
                                        {
                                            showModal ?
                                        
                                        <div>
                                            <Info
                                                show={showModal.show}
                                                heading={showModal.heading}
                                                body={showModal.body}
                                                closeModal={closeModal}
                                            />
                                        </div>
                                        :""
                                        }
                                    </div>

                                )
                                :
                                (<NoDataFound />)
                        }
                        <Footer />
                    </div>



                    {/* <div className="card_item">
                                    <div className="card_inner">
                                        <div className="role_name">Ind vs Eng Test Series</div>
                                        <div className="real_name">International Match</div>
                                        <table style={{ border: 'solid 2px black' }}>
                                            <tr>
                                                <td>
                                                    India
                                                </td>
                                                <td>
                                                    England
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    334/5
                                                </td>
                                                <td>
                                                    231/4
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    (98)
                                                </td>
                                                <td>
                                                    (89)
                                                </td>
                                            </tr>
                                        </table>
                                        <div>
                                            <span>England lead India by 27 runs</span>
                                        </div>
                                    </div>
                                </div> */}





                    {/* <div className="card_item">
                        <div className="card_inner">
                            {/* <img src="doctor_strange.png"> 
                            <div className="role_name">Doctor Strange</div>
                            <div className="real_name">Benedict Cumberbatch</div>
                            <div className="film">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </div>
                    <div className="card_item">
                        <div className="card_inner">
                            {/* <img src="black_widow.png"> 
                            <div className="role_name">Black Widow</div>
                            <div className="real_name">Scarlett Johansson</div>
                            <div className="film">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </div>
                    <div className="card_item">
                        <div className="card_inner">
                            {/* <img src="Spider_man.png"> 
                            <div className="role_name">Spider Man</div>
                            <div className="real_name">Tom Holland</div>
                            <div className="film">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </div>
                    <div className="card_item">
                        <div className="card_inner">
                            * <img src="black_widow.png"> 
                            <div className="role_name">Black Widow</div>
                            <div className="real_name">Scarlett Johansson</div>
                            <div className="film">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </div>
                    <div className="card_item">
                        <div className="card_inner">
                            * <img src="black_panther.png"> *
                            <div className="role_name">Black Panther</div>
                            <div className="real_name">Chadwick Boseman</div>
                            <div className="film">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </div>
                    <div className="card_item">
                        <div className="card_inner">
                            {/* <img src="Spider_man.png"> *
                            <div className="role_name">Spider Man</div>
                            <div className="real_name">Tom Holland</div>
                            <div className="film">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>
                    </div>
                    <div className="card_item">
                        <div className="card_inner">
                            {/* <img src="doctor_strange.png"> 
                            <div className="role_name">Doctor Strange</div>
                            <div className="real_name">Benedict Cumberbatch</div>
                            <div className="film">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                tempor incididunt aliqua.</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;