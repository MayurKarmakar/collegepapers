import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'


export default function AboutWebsite() {

    document.title = 'About us'

    return (
        <React.Fragment>
            <Header/>
            <div className='container'>
                <div className='row'>
                    <div className='col mt-4'>
                        <h1>About</h1>
                        <hr/>
                        <blockquote className="blockquote text-center">
                            <p className="mb-0"><em>" They know enough who know how to learn. "</em></p>
                        </blockquote>
                        <br/>
                        <h5>This project is the outcome of great support, encouragement, inspiration, uninterrupted support,
                            guidance, suggestions, motivation, introducing me to the world of awesome techonologies, shapping my way of making approach and for having faith on me. A big thanks to my elder brother <b>Mr. Amit Karmakar</b>. It was a great experience learning new technical stuffs,
                            understanding the requirements, working on real projects, learning out of the box stuffs with you. Thanks to <b>Mr. Vikash Karmakar</b> for 
                            getting me introduce to different workflows, different technologies, motivation, support, cooperation and more.
                        </h5>
                        <br />
                        <h3>Idea</h3>
                        <p>The core idea behind developing this website is to provide useful study materials to the students 
                            being a part of the college. Also, to make students aware of the latest technologies, inventions and 
                            social events. This webapp is a centeralized place that holds and servers such useful contents to the 
                            students.
                        </p>
                        <br />
                        <br/>
                        <h3>The website</h3>
                        <p><strong>Collegepapers.in</strong> serves you with all possible study materials confined to courses of various departments, taught in <strong>Trident College, Bhubaneshwar</strong> and the syllabus proposed by <strong>Utkal University</strong>. The course materials are categorised 
                                in sections: Previous year question papers, Notes and Syllabus. All contents are downloadable  whenever needed which makes the webapp a 
                                central place for serving all such contents. <strong>Collegepapers.in</strong> also keeps you updated with all college related informations and events
                            . This website is built keeping in mind about the ease of accessing contents, effecient UI design and focused on
                            providing contents that are intuitive to students and  to have a great experience using the website.
                        </p>
                        <br/>
                        <br/>
                        <h3>Technologies Used</h3>
                        <p>The core technologies used to build this website are :</p>
                        <ul className='ml-4'>
                            <li><b>Bootstrap</b></li>
                            <li><b>Javascript</b></li>
                            <li><b>Python</b> (For the backend)</li>
                            <li><b>Django</b> (As the framework.)</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}
