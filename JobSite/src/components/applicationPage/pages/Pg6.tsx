import React from 'react'

const Pg6 = () => {
    const [agree, setAgree] = React.useState<boolean>(false);
  return (
    <>
    <p className="font-semibold text-sm p-5">
              By checking the below box, I certify that the answers given herein
              are true and complete to the best of my knowledge. I authorize
              investigation of all statements contained in this application and
              supporting documents which have been submitted for employment as
              may be necessary in arriving at an employment decision.{" "}
            </p>
            <p className="font-semibold text-sm p-5">
              I HEREBY UNDERSTAND AND ACKNOWLEDGE THAT, IF HIRED, MY EMPLOYMENT
              RELATIONSHIP WITH THIS ORGANIZATION WOULD BE OF AN “AT WILL”
              NATURE, WHICH MEANS THAT THE EMPLOYEE MAY RESIGN AT ANY TIME AND
              THE EMPLOYER MAY DISCHARGE THE EMPLOYEE AT ANY TIME AND FOR ANY OR
              NO REASON. IT IS FURTHER UNDERSTOOD THAT THIS “AT WILL” EMPLOYMENT
              RELATIONSHIP MAY NOT BE CHANGED BY ANY WRITTEN DOCUMENT OR CONDUCT
              UNLESS SUCH CHANGE IS SPECIFICALLY ACKNOWLEDGED IN WRTING BY AN
              AUTHORIZED EXECUTIVE OF THIS ORGANIZATION.
            </p>
            <p className="p-5">
              In the event of employment, I understand that false or misleading
              information given in my application or interview(s) may result in
              discharge.{" "}
            </p>
            <div className="p-5">
              <input
                type="checkbox"
                id="agree"
                value="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                required
              />
              <label htmlFor="agree" className="px-5">
                I Agree
              </label>
            </div>
            <p className="p-5">
              Bethel College does not discriminate in its employment practices
              or in its educational programs or activities on basis of race,
              religion, color, sex/gender, pregnancy, political affiliation,
              religion, creed, ethnicity, national origin (including ancestry),
              citizenship status, physical or mental disability (including
              perceived disability), age, marital status, sexual orientation,
              gender identity, gender expression, veteran or military status
              (including disabled veteran, recently separated veteran, active
              duty wartime or campaign badge veteran, and Armed Forces Service
              Medal veteran), predisposing genetic characteristics, domestic
              violence victim status, or any other protected category under
              applicable local, state, or federal law. The College also
              prohibits retaliation against any person opposing discrimination
              or participating in any discrimination investigation or complaint
              process internally or externally. Reports of misconduct, questions
              regarding Title IX, and concerns about noncompliance should be
              directed to the Director of Human Resources & Compliance (Title IX
              Coordinator). For a complete copy of the policy or for more
              information, please contact the Director of Human Resources &
              Compliance (Title IX Coordinator) or the Assistant Secretary of
              Education within the Office for Civil Rights (OCR). Bethel College
            </p>
            <a href="https://www.bethelks.edu/equalopp">
              Equal Opportunity Policy
            </a>
            <div className="flex justify-center">
              <input
                type="submit"
                className="border border-maroon rounded-xl bg-maroon text-white p-2"
              ></input>
            </div>
    </>
  )
}

export default Pg6
