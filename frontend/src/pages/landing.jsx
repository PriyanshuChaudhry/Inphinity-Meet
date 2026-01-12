import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                
                <img src="/logo.png" alt="Inphinity Meet" className="logo" />
                <div className='navlist'>
                    <p onClick={() => {
                        router("/auth")

                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")

                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>


            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "rgb(123 47 207)" }}>Connect Infinitely.</span>Talk Freely with your loved Ones.</h1>

                    <p>Your Private & Powerful Video Calling Experience.</p>
                    <div role='button'>
                        <Link to={"/auth"}>Launch a Call</Link>
                    </div>
                </div>
                <div>

                    <img src="/mobile.png" alt="" />

                </div>
            </div>



        </div>
    )
}
