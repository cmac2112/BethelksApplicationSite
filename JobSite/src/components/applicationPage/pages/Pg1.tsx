import React, { useContext } from 'react'
import Layout from '../../layout';
import { ApplicationContext } from '../applicationContext';
import Error from '../../modals/Error';

const Pg1  = () => {
  const {errorMessage, setErrorMessage,
    hearAbout, setHearAbout,
    position, setPosition,
    isFaculty, setIsFaculty,
    openPositions,
    workTime, setWorkTime,
    handleWorkTimeChange,
    startTime, setStartTime
   } = useContext(ApplicationContext);

  return (
    <>
            <h2 className="p-5 text-xl" id="position-header">
              How did you hear about Bethel?
            </h2>
            <div className="px-5">
              <div>
                <input
                  type="radio"
                  id="Indeed"
                  name="hear_about"
                  value="Indeed"
                  checked={hearAbout === "Indeed"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="Indeed">
                  Indeed
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="HACU"
                  name="hear_about"
                  value="HACU"
                  checked={hearAbout === "HACU"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="HACU">
                  HACU
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Academic-Diversity-Search"
                  name="hear_about"
                  value="Academic-Diversity-Search"
                  checked={hearAbout === "Academic-Diversity-Search"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="Academic-Diversity-Search">
                  Academic Diversity Search
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Higher-Ed-Jobs"
                  name="hear_about"
                  value="Higher-Ed-Jobs"
                  checked={hearAbout === "Higher-Ed-Jobs"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="Higher-Ed-Jobs">
                  Higher Ed Jobs
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="hear_about"
                  value="other"
                  checked={hearAbout === "other"}
                  onChange={(e) => {
                    setHearAbout(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="other">
                  Other
                </label>
              </div>
            </div>
            <h2 className="p-5 text-xl">Position applying for</h2>
            <div className="px-5">
              <select
                name="job-applying-for"
                id="job-applying-for"
                className="bg-slate-200"
                value={position}
                onChange={(e) => {
                  const selectedTitle = e.target.value;
                  setPosition(selectedTitle);

                  // Find the position that matches the selected title
                  const selectedPosition = openPositions.find(
                    (positions) => positions.title === selectedTitle
                  );

                  // If found, set the employment type to state
                  if (selectedPosition) {
                    setIsFaculty(
                      selectedPosition.employment === "faculty" ? true : false
                    );
                  }
                }}
              >
                <option value="">Choose an option</option>
                {openPositions.map((positions) => (
                  <option
                    key={positions.id}
                    value={positions.title}
                    className="bg-white"
                  >
                    {positions.title}
                    {positions.employment}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="p-5 text-xl">Working Time</h2>
            <div className="px-5">
              <div>
                <input
                  type="checkbox"
                  id="fullTime"
                  name="fullTime"
                  value="fullTime"
                  checked={workTime.fullTime}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="fullTime">
                  Full Time
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="partTime"
                  value="partTime"
                  name="partTime"
                  checked={workTime.partTime}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="partTime">
                  Part Time
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="temporary"
                  name="temporary"
                  value="Temporary"
                  checked={workTime.temporary}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="temporary">
                  Temporary
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="evenings"
                  name="evenings"
                  value="Evenings"
                  checked={workTime.evenings}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="evenings">
                  Evenings
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="weekends"
                  name="weekends"
                  value="Weekends"
                  checked={workTime.weekends}
                  onChange={handleWorkTimeChange}
                />
                <label className="px-1" htmlFor="weekends">
                  Weekends
                </label>
                <div>
                  <input
                    type="checkbox"
                    id="nights"
                    name="nights"
                    value="Nights"
                    checked={workTime.nights}
                    onChange={handleWorkTimeChange}
                  />
                  <label className="px-1" htmlFor="nights">
                    Nights
                  </label>
                </div>
              </div>
            </div>
            <h2 className="p-5 text-xl">When are you available to start?</h2>
            <div className="px-5">
              <input
                type="date"
                name="start-time"
                className="border border-gray-200 rounded-xl p-2"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            </>
  )
}

export default Pg1
