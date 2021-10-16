import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Info from '../alert/info.component';
import Footer from '../footer/footer.component';
import Header from '../header/header';
import NoDataFound from '../no-data/no-data.component';
import './favourite.style.css';

const Favourite = props => {

    const [favData, setFavData] = useState([]);

    const [showModal, setShowModal] = useState({
        show: false,
        heading: "",
        body: ""
    });
    let endpoint = `http://localhost:8081/api/v1/getfavourites/${sessionStorage.getItem('userId')}`
    useEffect(() => {
        axios.get(endpoint, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => {
                // console.log(res.data);
                setFavData(res.data);
            })
            .catch(err => {
                setShowModal({
                    ...showModal,
                    show: true,
                    heading: "Error",
                    body: err?.response?.data
                });
                console.log(err.response.data);
            })
    }, [])

    const deleteFavourite = gameId => {
        // console.log('delete id', gameId);
        let favList = favData.filter(ele => ele.gameId === gameId)
        // console.log(favList);
        let deleteUrl = `http://localhost:8081/api/v1/deletefavouritebyid/${sessionStorage.getItem('userId')}/${gameId}`
        axios.delete(deleteUrl, {
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            // console.log(res.data)
            // alert(res.data);
            console.log('i m else');
            setShowModal({
                ...showModal,
                show: true,
                heading: 'Info',
                body: res.data
            });
            axios.get(endpoint, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            })
                .then(res => {
                    // console.log(res.data);
                    setFavData(res.data);
                })
                .catch(err => {
                    console.log(err.response.data);
                    setShowModal({
                        ...showModal,
                        show: true,
                        heading: 'Error',
                        body: err?.response?.data
                    });

                })
        })
            .catch(err =>{
                console.log(err);
                setShowModal({
                    ...showModal,
                    show: true,
                    heading: 'Error',
                    body: err?.response?.data
                });
            });
    }

    const closeModal = () => {
        setShowModal({
            ...showModal,
            show: false,
            heading: '',
            body: ''
        });
    }

    return (

        <div>
            <Header />
            <div className="header-fav">Favourite Live Score for {sessionStorage.getItem('userId')} </div>

            <div class="row" style={{ paddingTop: '15px', backgroundColor: "#d6d4fa" }}>
                {
                    favData.length > 0 ?

                        favData.map(data => (
                            <div class="col-md-4" key={data.gameId}>
                                <div class="card" style={{ margin: '15px' }}>
                                    <div class="card-body shadow bg-white rounded" >
                                        <h5 class="card-title result-text" style={{ textAlign: 'center', color: '#e36686' }}>{data.gameTitle}</h5>
                                        <p class="card-text result-text" style={{ fontSize: "16px" }} id="match"> Match - {data.firstTeam} vs {data.secondTeam} </p>
                                        <p class="card-text" style={{ fontSize: "14px" }}> Category - {data.gameCategory}</p>
                                        <p class="card-text" style={{ fontSize: "14px" }}>Score<br /> {data.firstTeam}-{data.firstTeamScoreOne} <br />{data.secondTeam}-{data.secondTeamScoreOne}</p>
                                        <p class="card-text result-text" style={{ fontSize: "14px" }}>Result - {data.result} </p>
                                    </div>
                                    <div class="card-footer">
                                        <button className="btn btn-danger" id="deleteFav" style={{ width: '100%' }} onClick={() => deleteFavourite(data.gameId)} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg></button>
                                    </div>
                                </div>
                            </div>
                        ))
                        : (<NoDataFound />)
                }
                <div>
                    <Info
                        show={showModal.show}
                        heading={showModal.heading}
                        body={showModal.body}
                        closeModal={closeModal}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}


export default Favourite;