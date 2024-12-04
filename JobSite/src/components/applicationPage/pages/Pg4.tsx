import { useContext, useState } from "react";
import { ApplicationContext } from "../applicationContext";
const Pg4 = () => {
  const {
    setResume,
    setCoverLetter,
    setReferences,
    isFaculty,
    setStatementOfTeach,
    setDiversityStatement,
    setGraduateTranscript,
    setPerformanceRec,
    setHighSchool,
    setGrad,
    setUndergrad,
    highSchool,
    grad,
    undergrad,
    other,
    setOther,
    skills,
    setSkills,
  } = useContext(ApplicationContext);
  const [optout, setOptout] = useState<boolean>(false);

  return (
    <>
      <h2 className="p-5 text-xl">Upload Documents</h2>
      <p className="py-2 px-5">
        If you choose to upload a resume, you may opt to skip employment,
        education, and skills sections. Please continue to signature section.
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
                These files are required because you selected a faculty position
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
      {!optout && (
        <div className="px-5 flex flex-col">
          <h2 className="py-5 text-xl">High School</h2>
          <label htmlFor="highschool">Name</label>
          <input
            type="text"
            id="highschool"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={highSchool.name}
            onChange={(e) =>
              setHighSchool({
                ...highSchool,
                name: e.target.value,
              })
            }
          />
          <label htmlFor="highschool-address">Address</label>
          <input
            type="text"
            id="highschool-address"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={highSchool.address}
            onChange={(e) =>
              setHighSchool({
                ...highSchool,
                address: e.target.value,
              })
            }
          />
          <label htmlFor="highschool-diploma">Diploma/Degree Level</label>
          <input
            type="text"
            id="highschool-diploma"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={highSchool.diploma}
            onChange={(e) =>
              setHighSchool({
                ...highSchool,
                diploma: e.target.value,
              })
            }
          />
          <h2 className="py-5 text-xl">Undergraduate College or University</h2>
          <label htmlFor="undergrad-name">Name</label>
          <input
            type="text"
            id="undergrad-name"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={undergrad.name}
            onChange={(e) =>
              setUndergrad({
                ...undergrad,
                name: e.target.value,
              })
            }
          />
          <label htmlFor="undergrad-address">Address</label>
          <input
            type="text"
            id="undergrad-address"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={undergrad.address}
            onChange={(e) =>
              setUndergrad({
                ...undergrad,
                address: e.target.value,
              })
            }
          />
          <label htmlFor="undergrad-course">Course of Study</label>
          <input
            type="text"
            id="undergrad-course"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={undergrad.courseStudy}
            onChange={(e) =>
              setUndergrad({
                ...undergrad,
                courseStudy: e.target.value,
              })
            }
          />
          <label htmlFor="undergrad-diploma">Diploma/Degree Level</label>
          <input
            type="text"
            id="undergrad-diploma"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={undergrad.diploma}
            onChange={(e) =>
              setUndergrad({
                ...undergrad,
                diploma: e.target.value,
              })
            }
          />
          <h2 className="py-5 text-xl">
            Graduate/Professional College or University
          </h2>
          <label htmlFor="grad-name">Name</label>
          <input
            type="text"
            id="grad-name"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={grad.name}
            onChange={(e) =>
              setGrad({
                ...grad,
                name: e.target.value,
              })
            }
          />
          <label htmlFor="grad-address">Address</label>
          <input
            type="text"
            id="grad-address"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={grad.address}
            onChange={(e) =>
              setGrad({
                ...grad,
                address: e.target.value,
              })
            }
          />
          <label htmlFor="grad-course">Course of Study</label>
          <input
            type="text"
            id="grad-course"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={grad.courseStudy}
            onChange={(e) =>
              setGrad({
                ...grad,
                courseStudy: e.target.value,
              })
            }
          />
          <label htmlFor="grad-diploma">Diploma/Level of Degree</label>
          <input
            type="text"
            id="grad-diploma"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={grad.diploma}
            onChange={(e) =>
              setGrad({
                ...grad,
                diploma: e.target.value,
              })
            }
          />
          <h2 className="py-5 text-xl">Other (Specify)</h2>
          <label htmlFor="other-name">Name</label>
          <input
            type="text"
            id="other-name"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={other.name}
            onChange={(e) =>
              setOther({
                ...other,
                name: e.target.value,
              })
            }
          />
          <label htmlFor="other-address">Address</label>
          <input
            type="text"
            id="other-address"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={other.address}
            onChange={(e) =>
              setOther({
                ...other,
                address: e.target.value,
              })
            }
          />
          <label htmlFor="other-courseStudy">Course of Study</label>
          <input
            type="text"
            id="other-courseStudy"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={other.courseStudy}
            onChange={(e) =>
              setOther({
                ...other,
                courseStudy: e.target.value,
              })
            }
          />
          <label htmlFor="other-diploma">Diploma/Level of Degree</label>
          <input
            type="text"
            id="other-diploma"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={other.diploma}
            onChange={(e) =>
              setOther({
                ...other,
                diploma: e.target.value,
              })
            }
          />
          <h2 className="py-5 text-xl">Skills</h2>
          <label htmlFor="skills" className="text-xs">
            SPECIAL TRAINING/SKILLS/PROFESSIONAL MEMBERSHIPS/OTHER INFORMATION
          </label>
          <textarea
            id="skills"
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default Pg4;
