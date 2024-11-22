import React, { useContext } from 'react'
import { ApplicationContext } from '../applicationContext';

const Pg2 = () => {
    const {fullName, setFullName,
        currentAddress, setCurrentAddress,
        permanentAddress, setPermanentAddress,
        contact, setContact,
        preferredContact, setPreferredContact,
    } = useContext(ApplicationContext);
  return (
    <>
    <h2 className="p-5 text-xl">Personal Information</h2>
            <div className="px-5">
              <input
                type="text"
                id="first-name"
                name="first-name"
                placeholder="Enter full name..."
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <h2 className="p-5 text-xl">Current Address</h2>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="address-street"
                name="address-street"
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={currentAddress.address}
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    address: e.target.value,
                  })
                }
              />
              <label htmlFor="address-street">Address</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="city"
                name="city"
                value={currentAddress.city}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    city: e.target.value,
                  })
                }
              />
              <label htmlFor="city">City</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="state"
                name="state"
                value={currentAddress.state}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    state: e.target.value,
                  })
                }
              />
              <label htmlFor="state">State</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="zip"
                name="zip"
                value={currentAddress.zip}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setCurrentAddress({
                    ...currentAddress,
                    zip: e.target.value,
                  })
                }
              />
              <label htmlFor="zip">Zip</label>
            </div>
            <h2 className="p-5 text-xl">
              Permenant Address If Different From Above
            </h2>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-address-street"
                name="perm-address-street"
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={permanentAddress.address}
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    address: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-address-street">Address</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-city"
                name="perm-city"
                value={permanentAddress.city}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    city: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-city">City</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-state"
                name="perm-state"
                value={permanentAddress.state}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    state: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-state">State</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="text"
                id="perm-zip"
                name="perm-zip"
                value={permanentAddress.zip}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setPermanentAddress({
                    ...permanentAddress,
                    zip: e.target.value,
                  })
                }
              />
              <label htmlFor="perm-zip">Zip</label>
            </div>
            <h2 className="p-5 text-xl">Contact Information</h2>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={contact.phone}
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                onChange={(e) =>
                  setContact({
                    ...contact,
                    phone: e.target.value,
                  })
                }
              />
              <label htmlFor="phone">Cell/Home Phone</label>
            </div>
            <div className="px-5 flex flex-col-reverse">
              <input
                type="email"
                id="email"
                name="email-input"
                className="border border-gray-200 rounded-xl p-2 w-1/2"
                value={contact.email}
                onChange={(e) =>
                  setContact({
                    ...contact,
                    email: e.target.value,
                  })
                }
              />
              <label htmlFor="email">Email</label>
            </div>
            <h2 className="p-5 text-xl">Preferred Contact Method</h2>
            <div className="px-5">
              <div>
                <input
                  type="radio"
                  id="phone-radio"
                  name="phone-input"
                  value="phone"
                  checked={preferredContact === "phone"}
                  onChange={(e) => {
                    setPreferredContact(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="phone-radio">
                  Phone
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="email-radio"
                  name="email"
                  value="email"
                  checked={preferredContact === "email"}
                  onChange={(e) => {
                    setPreferredContact(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="email-radio">
                  Email
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no-preference"
                  name="no-preference"
                  value="no-preference"
                  checked={preferredContact === "no-preference"}
                  onChange={(e) => {
                    setPreferredContact(e.target.value);
                  }}
                />
                <label className="px-1" htmlFor="no-preference">
                  No Preference
                </label>
              </div>
            </div>
            </>
  )
}

export default Pg2
