import React from 'react';
import './table.style.css';

const Table = props => {
    // console.log('props from dashboard', props.data);
    // let {props.data} = props.props.data;


    const cricketTable = (

        <table style={{ border: 'solid 2px #e36686' }}>
            <thead>
                <tr>
                    <td>
                       <p>Team1</p> 
                    </td>
                    <td>
                       <p>Team2</p> 
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <p>{props.data.Events[0].T1[0].Nm}</p>
                    </td>
                    <td>
                        {props.data.Events[0].T2[0].Nm}
                    </td>
                </tr>
                <tr>

                    {props.data.Events[0].Tr1C1 != null ? <td>{props.data.Events[0].Tr1C1}/{props.data.Events[0].Tr1CW1}</td> : <td>Yet To Play</td>}

                    {props.data.Events[0].Tr2C1 != null ? <td>{props.data.Events[0].Tr2C1}/{props.data.Events[0].Tr2CW1}</td> : <td>Yet To Play</td>}

                </tr>
                <tr>
                    {props.data.Events[0].Tr1C1 != null ? <td>{props.data.Events[0].Tr1CO1}</td> : ""}
                    {props.data.Events[0].Tr1C1 != null ? <td>{props.data.Events[0].Tr2CO1}</td> : ""}

                </tr>

                <tr>

                    {props.data.Events[0].Tr1C2 != null ? <td>{props.data.Events[0].Tr1C2}/{props.data.Events[0].Tr1CW2}</td> : ""}

                    {props.data.Events[0].Tr2C2 != null ? <td>{props.data.Events[0].Tr2C2}/{props.data.Events[0].Tr2CW2}</td> : ""}

                </tr>
                <tr>
                    {props.data.Events[0].Tr1C2 != null ? <td>{props.data.Events[0].Tr1CO2}</td> : ""}
                    {props.data.Events[0].Tr2C2 != null ? <td>{props.data.Events[0].Tr2CO2}</td> : ""}

                </tr>
            </tbody>
        </table>
    )


    const soccerTable = (

        <table style={{ border: 'solid 2px #e36686' }}>
            <thead>
                <tr>
                    <td>
                        Team1
                    </td>
                    <td>
                        Team2
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {props.data.Events[0].T1[0].Nm}
                    </td>
                    <td>
                        {props.data.Events[0].T2[0].Nm}
                    </td>
                </tr>
                <tr>
                    <td>
                        Goals Score
                    </td>
                    <td>
                        Goals Score
                    </td>
                </tr>
                <tr style={{ textAlign: 'center' }}>
                    {props.data.Events[0].Tr1 != null ? <td>{props.data.Events[0].Tr1}</td> : <td>Yet To Play</td>}
                    {props.data.Events[0].Tr2 != null ? <td>{props.data.Events[0].Tr2}</td> : <td>Yet To Play</td>}
                </tr>
            </tbody>
        </table>
    );

    const badmintonTable = (

        <table style={{ border: 'solid 2px #e36686' }}>
            <thead>
                <tr>
                    <td>
                        Team1
                    </td>
                    <td>
                        Team2
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {props.data.Events[0].T1[0].Nm}
                    </td>
                    <td>
                        {props.data.Events[0].T2[0].Nm}
                    </td>
                </tr>
                <tr>
                    <td>
                        Score
                    </td>
                    <td>
                        Score
                    </td>
                </tr>
                <tr style={{ textAlign: 'center' }}>
                    {props.data.Events[0].Tr1 != null ? <td>{props.data.Events[0].Tr1}</td> : <td>Yet To Play</td>}
                    {props.data.Events[0].Tr2 != null ? <td>{props.data.Events[0].Tr2}</td> : <td>Yet To Play</td>}
                </tr>
            </tbody>
        </table>
    )

    if (props.category === 'soccer')
        return (soccerTable)
    else if (props.category === 'badminton')
        return (badmintonTable)
    else
        return (cricketTable)

}

export default Table;