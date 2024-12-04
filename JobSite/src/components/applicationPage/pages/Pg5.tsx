import { useContext } from 'react';
import { ApplicationContext } from '../applicationContext';

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
  const {employmentHistories, setEmploymentHistories} = useContext(ApplicationContext);
  
  const handleEmploymentHistoryChange = (index: number, field: keyof EmploymentHistory, value: string) => {
    const newEmploymentHistories = [...employmentHistories];
    newEmploymentHistories[index][field] = value;
    setEmploymentHistories(newEmploymentHistories);
  };

  const addEmploymentHistory = () => {
    setEmploymentHistories([
      ...employmentHistories,
      {
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
      }
    ]);
  };

  return (
    <div className="px-5 flex flex-col">
      <h2 className="py-5 text-xl">Present or Most Recent Employer</h2>
      <p className="py-2 text-sm">If you uploaded a resume, you can skip this section</p>
      {employmentHistories.map((employmentHistory, index) => (
        <div className='flex flex-col' key={index}>
          <label className="text-xl" htmlFor={`employer-input-${index}`}>Employer {index + 1}</label>
          <input
            type="text"
            id={`employer-input-${index}`}
            name={`employer-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.employer}
            onChange={(e) => handleEmploymentHistoryChange(index, 'employer', e.target.value)}
          />
          <label htmlFor={`employer-address-input-${index}`}>Address</label>
          <input
            type="text"
            id={`employer-address-input-${index}`}
            name={`employer-address-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.address}
            onChange={(e) => handleEmploymentHistoryChange(index, 'address', e.target.value)}
          />
          <label htmlFor={`employer-pos-title-${index}`}>Position</label>
          <input
            type="text"
            id={`employer-pos-title-${index}`}
            name={`employer-pos-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.positionTitle}
            onChange={(e) => handleEmploymentHistoryChange(index, 'positionTitle', e.target.value)}
          />
          <label htmlFor={`employer-start-${index}`}>Start Date</label>
          <input
            type="date"
            id={`employer-start-${index}`}
            name={`employer-startdate-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.startDate}
            onChange={(e) => handleEmploymentHistoryChange(index, 'startDate', e.target.value)}
          />
          <label htmlFor={`employer-end-${index}`}>End Date</label>
          <input
            type="date"
            id={`employer-end-${index}`}
            name={`employer-end-date-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.endDate}
            onChange={(e) => handleEmploymentHistoryChange(index, 'endDate', e.target.value)}
          />
          <label htmlFor={`employer-duties-${index}`}>Duties</label>
          <textarea
            id={`employer-duties-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.duties}
            onChange={(e) => handleEmploymentHistoryChange(index, 'duties', e.target.value)}
          />
          <label htmlFor={`employer-super-name-${index}`}>Supervisor Name</label>
          <input
            type="text"
            id={`employer-super-name-${index}`}
            name={`employer-supervisorname-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.supervisor}
            onChange={(e) => handleEmploymentHistoryChange(index, 'supervisor', e.target.value)}
          />
          <label htmlFor={`employer-super-title-${index}`}>Supervisor Title</label>
          <input
            type="text"
            id={`employer-super-title-${index}`}
            name={`employer-supervisorTitle-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.supervisorTitle}
            onChange={(e) => handleEmploymentHistoryChange(index, 'supervisorTitle', e.target.value)}
          />
          <h2 className="text-lg py-3">May we Contact?</h2>
          <div>
            <input
              type="radio"
              id={`employer-contact-yes-${index}`}
              name={`can-contact-${index}`}
              value="yes"
              checked={employmentHistory.contact === 'yes'}
              onChange={(e) => handleEmploymentHistoryChange(index, 'contact', e.target.value)}
            />
            <label className="px-1" htmlFor={`employer-contact-yes-${index}`}>
              Yes
            </label>
          </div>
          <div>
            <input
              type="radio"
              id={`employer-contact-no-${index}`}
              name={`can-contact-${index}`}
              value="no"
              checked={employmentHistory.contact === 'no'}
              onChange={(e) => handleEmploymentHistoryChange(index, 'contact', e.target.value)}
            />
            <label className="px-1" htmlFor={`employer-contact-no-${index}`}>
              No
            </label>
          </div>
          <label htmlFor={`employer-leaving-${index}`}>Reason For Leaving</label>
          <input
            type="text"
            id={`employer-leaving-${index}`}
            name={`employer-reason-${index}`}
            className="border border-gray-200 rounded-xl p-2 w-1/2"
            value={employmentHistory.reasonLeft}
            onChange={(e) => handleEmploymentHistoryChange(index, 'reasonLeft', e.target.value)}
          />
        </div>
      ))}
      <button type="button" onClick={addEmploymentHistory} className="bg-maroon p-2 rounded-xl text-white h-10 w-20 mt-4">
        Add
      </button>
    </div>
  );
};

export default Pg5;