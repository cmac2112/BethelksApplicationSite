import { useState } from 'react'
//import { ApplicationContext } from '../applicationContext';

interface EmploymentHistory {
  employer: string;
  address: string;
  positionTitle: string;
  startDate: string;
  endDate: string;
  duties: string;
  supervisor: string;
  supervisorTitle: string;
  contact: string;
  reasonLeft: string;
}
const Pg5 = () => {
    //const { employmentHistories } = useContext(ApplicationContext);
    const [employmentHistory1, setEmploymentHistory1] = useState<EmploymentHistory>({
      employer: '',
      address: '',
      positionTitle: '',
      startDate: '',
      endDate: '',
      duties: '',
      supervisor: '',
      supervisorTitle: '',
      contact: '',
      reasonLeft: ''
    })
  return (
              <div className="px-5 flex flex-col">
                <h2 className="py-5 text-xl">
                  Present or Most Recent Employer
                </h2>
                <label htmlFor="employer-input">Employer</label>
                <input
                  type="text"
                  id="employer-input"
                  name="employer"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.employer}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      employer: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-address-input1">Address</label>
                <input
                  type="text"
                  id="employer-address-input1"
                  name="employer-address"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.address}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      address: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-pos-title1">Position</label>
                <input
                  type="text"
                  id="employer-pos-title1"
                  name="employer-pos1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.positionTitle}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      positionTitle: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-start1">Start Date</label>
                <input
                  type="date"
                  id="employer-start1"
                  name="employer-startdate1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.startDate}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      startDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-end1">End Date</label>
                <input
                  type="date"
                  id="employer-end1"
                  name="employer-end-date1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.endDate}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      endDate: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-duties1">Duties</label>
                <textarea
                  id="employer-duties1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.duties}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      duties: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-name1">Supervisor Name</label>
                <input
                  type="text"
                  id="employer-super-name1"
                  name="employer-supervisorname"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.supervisor}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      supervisor: e.target.value,
                    })
                  }
                />
                <label htmlFor="employer-super-title1">Supervisor Title</label>
                <input
                  type="text"
                  id="employer-super-title1"
                  name="employer-supervisorTitle"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.supervisorTitle}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      supervisorTitle: e.target.value,
                    })
                  }
                />
                <h2 className="text-lg py-3">May we Contact?</h2>
                <div>
                  <input
                    type="radio"
                    id="employer-contact1-yes"
                    name="can-contact1"
                    value="yes"
                    checked={employmentHistory1.contact === "yes"}
                    onChange={(e) =>
                      setEmploymentHistory1({
                        ...employmentHistory1,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact1-yes">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="employer-contact1-no"
                    name="can-contact1"
                    value="no"
                    checked={employmentHistory1.contact === "no"}
                    onChange={(e) =>
                      setEmploymentHistory1({
                        ...employmentHistory1,
                        contact: e.target.value,
                      })
                    }
                  />
                  <label className="px-1" htmlFor="employer-contact1-no">
                    No
                  </label>
                </div>
                <label htmlFor="employer-leaving1">Reason For Leaving</label>
                <input
                  type="text"
                  id="employer-leaving1"
                  name="employer-reason1"
                  className="border border-gray-200 rounded-xl p-2 w-1/2"
                  value={employmentHistory1.reasonLeft}
                  onChange={(e) =>
                    setEmploymentHistory1({
                      ...employmentHistory1,
                      reasonLeft: e.target.value,
                    })
                  }
                />
                </div>

  )
}

export default Pg5
