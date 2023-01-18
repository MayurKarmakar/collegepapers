import React, { Component } from 'react'
import axios from 'axios'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

class covidTracker extends Component {
    state = {
        covidCases: null,
        OdishaConfirm: null,
        OdishaRecovery: null,
        OdishaActive: null,
        OdishaDeath: null,
        OdishaDailyConfirm: null,
        OdishaDailyRecover: null,
        OdishaDailyDeath: null,
    }

    componentDidMount = () => {
        axios.get('https://api.covid19india.org/data.json')
        .then((res)=> {this.setState({covidCases: res.data});console.log(res.data )})
        .catch((error)=>console.log(error))
        setTimeout(()=>{
            console.log(this.state)
            this.arrangeData()
        },1000)
    }

    arrangeData = () => {
        if(this.state){
            this.state.covidCases.statewise.map((item)=>{
                item.statecode === 'OR'? this.setState(()=>{
                    return {
                        OdishaConfirm: item.confirmed,
                        OdishaRecovery: item.recovered,
                        OdishaActive: item.active,
                        OdishaDeath: item.deaths,
                        OdishaDailyConfirm: item.deltaconfirmed,
                        OdishaDailyRecover: item.deltarecovered,
                        OdishaDailyDeath: item.deltadeaths
                    }
                }): null
            })
        }
    }

    render() {
        console.log(this.state)
        return (
            <React.Fragment>
                <Header/>
                    <div className='container pt-5'>
                        <h1 className='mb-3'>
                            Coronavirus Live Tracker
                        </h1>
                        <div className='d-flex justify-content-center flex-wrap'>
                            <div className='col-6 m-1'>
                                <div className='card'>
                                    <div className='card-body h-100 text-center'>
                                        <p className='mb-0 '>
                                            <strong>{this.state.OdishaConfirm}</strong>({this.state.OdishaDailyConfirm} {'New Cases Today'})
                                            <br/>{" "}Confirmed{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 m-1'>
                                <div className='card'>
                                    <div className='card-body h-100 text-center'>
                                        <p className="mb-0">
                                            <strong>{this.state.OdishaActive}</strong> Active{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 m-1'>
                                <div className='card'>
                                    <div className='card-body h-100 text-center'>
                                        <p className=' mb-0'>
                                            <strong>{this.state.OdishaDailyRecover}</strong> (
                                                {this.state.OdishaDailyRecover} {" New Cases Today"} ) <br/>{" "}
                                                Recovered{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-6 m-1'>
                                <div className='card'>
                                    <div className='card-body h-100 text-center'>
                                        <p className=' mb-0'>
                                            <strong>{this.state.OdishaDeath}</strong>({this.state.OdishaDailyDeath}{" New Cases Today"}) <br/>{" "}
                                            Decased{" "}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <Footer/>
            </React.Fragment>
        )
    }
}

export default covidTracker