import React, { useContext } from 'react'
import { ApplicationContext } from '../applicationContext';
const Pg4 = () => {
    const {optout, setOptout,
        resume, setResume,
        coverLetter, setCoverLetter,
        references, setReferences,
        isFaculty, setIsFaculty,
        statementOfTeach, setStatementOfTeach,
        diversityStatement,setDiversityStatement,
        graduateTranscript, setGraduateTranscript,
        performanceRec, setPerformanceRec
    } = useContext(ApplicationContext)
  return (
    <>
     <h2 className="p-5 text-xl">Upload Documents</h2>
            <p className="py-2 px-5">
              If you choose to upload a resume, you may opt to skip employment,
              education, and skills sections. Please continue to signature
              section.
            </p>
            <div className="p-5">
              <input
                type="checkbox"
                name="optout-input"
                id="optout"
                checked={optout === true}
                onChange={() => {
                  setOptout(!optout);
                }}
              />
              <label htmlFor="optout" className="px-1">
                Opt out of sections?
              </label>
            </div>
            <div className="px-5 flex flex-col">
              <label htmlFor="resume">Resume/CV</label>
              <input
                type="file"
                name="resume-input"
                id="resume"
                className="py-3"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setResume(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="cover-letter">Cover Letter</label>
              <input
                type="file"
                name="cover-letter-input"
                id="cover-letter"
                className="py-3"
                onChange={(e) => {
                  if (e.target.files) {
                    setCoverLetter(e.target.files[0]);
                  }
                }}
              />
              <label htmlFor="references">References</label>
              <input
                type="file"
                name="references-input"
                id="references"
                className="py-3"
                onChange={(e) => {
                  if (e.target.files) {
                    setReferences(e.target.files[0]);
                  }
                }}
              />
              {/*if a position is faculty display below, if not dont show this*/}
              {isFaculty && (
                <>
                  <div className="py-5">
                    <h2 className="py-3 text-xl">
                      Upload Required Faculty Documents
                    </h2>
                    <p className="text-maroon">
                      These files are required because you selected a faculty
                      position
                    </p>
                  </div>
                  <label htmlFor="philosophy">
                    Statement of Teaching Philosophy*
                  </label>
                  <input
                    type="file"
                    name="philosophy"
                    id="philosophy"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setStatementOfTeach(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="diversity">Diversity Statement*</label>
                  <input
                    type="file"
                    name="diversity"
                    id="diversity"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setDiversityStatement(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="grad">Graduate Transcript*</label>
                  <input
                    type="file"
                    name="grad"
                    id="grad"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setGraduateTranscript(e.target.files[0]);
                      }
                    }}
                  />
                  <label htmlFor="performance">
                    Performance or Rehersal Recording
                  </label>
                  <input
                    type="file"
                    name="performance"
                    id="performance"
                    className="py-3"
                    onChange={(e) => {
                      if (e.target.files) {
                        setPerformanceRec(e.target.files[0]);
                      }
                    }}
                  />
                </>
              )}
            </div>
            </>
  )
}

export default Pg4
