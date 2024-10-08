import React, { useState, useEffect } from 'react';

const Switch = (props) => {
  const [toggle, setToggle] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [timeDiff, setTimeDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [oldRecID, setOldRecID] = useState(0);

  useEffect(() => {
    const fetchPreviousStatus = async () => {
      const config = {
        appName: "service-status",
        reportName: "Service_Status_Report",
        criteria: `Source == ${props.source_id} && Service_New == ${props.service_id} && Start_Time != null && End_Time == null`
      };
      try {
        await ZOHO.CREATOR.init();
        const response = await ZOHO.CREATOR.API.getAllRecords(config);
        if (response.data && response.data.length > 0) {
          setStartTime(response.data[0].Start_Time);
          setOldRecID(response.data[0].ID);
          setToggle(response.data[0].Status == "Up" ? true : false);
        }
      } catch (err) {

      }
    };
    fetchPreviousStatus();
  }, [props.source_id, props.service_id, toggle]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = formatDateTime();
      calculateTimeDifference(startTime, now);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [startTime]);

  const calculateTimeDifference = (startDateTime, endDateTime) => {
    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);
    const diff = endDate - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    setTimeDiff({ days, hours, minutes, seconds });
  };

  const formatDateTime = () => {
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const hours = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');
    const seconds = `${now.getSeconds()}`.padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleToggleClick = (e) => {
    setPendingToggle(e.target.checked);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (pendingToggle !== null) {
      await updateServiceStatus();
      await createServiceStatus(pendingToggle);
      setToggle(pendingToggle);
      setShowModal(false);
      setPendingToggle(null);
     
     
    }
  };

  const createServiceStatus = async (status) => {
    const now = formatDateTime();
    const formData = {
      data: {
        Source: props.source_id,
        Service_New: props.service_id,
        Status: status ? "Up" : "Down",
        Start_Time: now
      }
    };
    const config = {
      appName: "service-status",
      formName: "Service_Status_Form",
      data: formData
    };
    try {
      await ZOHO.CREATOR.init();
      await ZOHO.CREATOR.API.addRecord(config);
    } catch (err) {
    }
  };

  const updateServiceStatus = async () => {
    if(oldRecID){
      const now = formatDateTime();
      const formData = {
        "data" : {
          "End_Time" : now,
        }
      }
      const config = {
        appName : "service-status",
        reportName: "Service_Status_Report",
        id: oldRecID,
        data: formData
      }
      try{
        await ZOHO.CREATOR.init();
        const response = await ZOHO.CREATOR.API.updateRecord(config);
      }
      catch(err)
      {
        console.log(err);
      }
    }
  }

  const handleCancel = () => {
    setShowModal(false);
    setPendingToggle(null);
  };

  return (
    <>
      <div className="form-check form-switch w-100 d-flex justify-content-center">
        <input
          type="checkbox"
          className={`form-check-input ${isNaN(timeDiff.hours) ?"":"inactive"} cursor-pointer`}
          checked={toggle}
          onChange={handleToggleClick}
        />
      </div>
      <div className='timer d-block'>
          {isNaN(timeDiff.hours) ?"Yet to Start" : `${timeDiff.days}d ${timeDiff.hours}h ${timeDiff.minutes}m ${timeDiff.seconds}s`}
        </div>

      <div className={`modal ${showModal ? 'show d-block' : 'fade'}`} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Alert</h5>
              <button type="button" className="btn-close" onClick={handleCancel} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h6>
                Do you wish to update the status to {toggle ? "Down" : "Up"} for the source {props.source} and {props.service}?
              </h6>
            </div>
            <div className="modal-footer justify-content-center">
              <button className='btn btn-secondary' onClick={handleCancel}>Cancel</button>
              <button className='btn btn-primary' onClick={handleConfirm}>Confirm</button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default Switch;