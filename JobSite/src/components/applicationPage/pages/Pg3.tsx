import React, { useContext } from 'react'
import { ApplicationContext } from '../applicationContext';

const Pg3 = () => {
    const {legalWork, setLegalWork,
        sponsorship, setSponsorship,
        applied, setApplied,
        related, setRelated,
        employed, setEmployed
    } = useContext(ApplicationContext);
  return (
    <>
    
    <h2 className="p-5 text-xl">
              Are You Leagally Allowed To Work In The United States?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="legal-work"
                id="legal-yes"
                value="allowed-to-work"
                checked={legalWork === "allowed-to-work"}
                onChange={(e) => {
                  setLegalWork(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="legal-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="legal-work"
                id="legal-no"
                value="not-allowed-to-work"
                checked={legalWork === "not-allowed-to-work"}
                onChange={(e) => {
                  setLegalWork(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="legal-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Will You Require Sponsorship In The Next 1-3 Years?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="sponsorship"
                id="sponsor-yes"
                value="yes"
                checked={sponsorship === "yes"}
                onChange={(e) => {
                  setSponsorship(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="sponsor-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="sponsorship"
                id="sponsor-no"
                value="no"
                checked={sponsorship === "no"}
                onChange={(e) => {
                  setSponsorship(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="sponsor-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Have You Ever Applied For Employment With Our Organization?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="ever-applied"
                id="applied-yes"
                value="yes"
                checked={applied === "yes"}
                onChange={(e) => {
                  setApplied(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="applied-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="ever-applied"
                id="applied-no"
                value="no"
                checked={applied === "no"}
                onChange={(e) => {
                  setApplied(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="applied-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Have You Ever Been Employed By Our Organization?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="ever-employed"
                id="employed-yes"
                value="yes"
                checked={employed === "yes"}
                onChange={(e) => {
                  setEmployed(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="employed-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="ever-employed"
                id="employed-no"
                value="no"
                checked={employed === "no"}
                onChange={(e) => {
                  setEmployed(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="employed-no">
                No
              </label>
            </div>
            <h2 className="p-5 text-xl">
              Are You Related To Anyone Currently Employed By Our Organization?*
            </h2>
            <div className="px-5">
              <input
                type="radio"
                name="related"
                id="related-yes"
                value="yes"
                checked={related === "yes"}
                onChange={(e) => {
                  setRelated(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="related-yes">
                Yes
              </label>
            </div>
            <div className="px-5">
              <input
                type="radio"
                name="related"
                id="related-no"
                value="no"
                checked={related === "no"}
                onChange={(e) => {
                  setRelated(e.target.value);
                }}
              />
              <label className="px-1" htmlFor="related-no">
                No
              </label>
            </div>
    </>
  )
}

export default Pg3
