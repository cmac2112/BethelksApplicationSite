import React from 'react'
import Layout from '../layout/Layout'
import './applicationPage.css'

const applicationPage = () => {
  return (
    <>
    <Layout>
    <div className="job-page">
                <h2 className="job-header">Application</h2>
        </div>
        <div className="bg">
        <form className="job-form">
            <h2 className="position-header">How did you hear about Bethel?</h2>
            <div className="hear-about">
                <div>
            <input type="radio" id="Indeed" name="hear_about" value="Indeed"/>
            <label htmlFor='Indeed'>Indeed</label>
                </div>
                <div>
            <input type="radio" id="HACU" name="hear_about" value="HACU" />
            <label htmlFor="HACU">HACU</label>
                </div>
                <div>
            <input type="radio" id="Academic-Diversity-Search" name="hear_about" value="Academic-Diversity-Search" />
            <label htmlFor="Academic-Diversity-Search">Academic Diversity Search</label>
                </div>
                <div>
            <input type="radio" id="Higher-Ed-Jobs" name="hear_about" value="Higher-Ed-Jobs" />
            <label htmlFor="Higher-Ed-Jobs">Higher Ed Jobs</label>
                </div>
                <div>
            <input type="radio" id="other" name="hear_about" value="other" />
            <label htmlFor="other">Other</label>
                </div>
            </div>
        
        </form>
        </div>
    </Layout>
    </>
  )
}

export default applicationPage