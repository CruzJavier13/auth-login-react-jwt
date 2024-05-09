import { Link } from "react-router-dom"
import React from "react"
interface Layout{
    children: React.ReactNode
}

export default function Layout({children} : Layout){
    
    return(
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to='/' >Home</Link>
                        </li>
                        
                        <li>
                            <Link to='/logout' >Logout</Link>
                        </li>

                        <li>
                            <Link to='/signup' >SignUp</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                {children}
            </main>
        </>
    )
}