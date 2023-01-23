import React from 'react';
import successImagePath from '../images/popup-success.svg';
import errorImagePath from '../images/popup-error.svg';

const InfoTooltip = ({ data, name, onClose }) => {
  return (
    <div className={`popup popup_type_${name} ${data.isOpen && 'popup_opened'}`}>
      <div className="popup__container popup__container_type_info-tooltip">
        <button className="btn btn_type_close" type="button" onClick={onClose}></button>
        {data.status && <div className="popup__register" style={{ backgroundImage: `url(${successImagePath})` }}></div>}
        {!data.status && <div className="popup__register" style={{ backgroundImage: `url(${errorImagePath})` }}></div>}
        <h2 className="popup__description">{data.title}</h2>
      </div>
    </div>
  );
};

export default InfoTooltip;