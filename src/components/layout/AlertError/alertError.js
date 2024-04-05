import { useState, useEffect } from 'react';
import '../AlertError/alertError.css';
import { MdOutlineErrorOutline } from "react-icons/md";

function AlertError({ show: initialShow, Title, Message, onDismiss }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(initialShow);
    if (initialShow) {
      const timer = setTimeout(() => {
        setShow(false);
        onDismiss && onDismiss(); // Chama a função callback quando o alerta desaparece
      }, 10000);
      return () => clearTimeout(timer); 
    }
  }, [initialShow, onDismiss]); // Adiciona onDismiss às dependências do useEffect

  if (show) {
    return (
      <div style={{visibility: show ? 'visible' : 'hidden', height: show ? 'auto' : 0,}} className='alertBody'>
        <div className='title'>
          <MdOutlineErrorOutline  value={{className:'img'}}/>
          <h2>{Title}</h2>
        </div>
        <hr></hr>
        <h6>
            {Message}
        </h6>
      </div>
    );
  } else {
    return null;
  }
}

export default AlertError;
