import { Modal } from 'antd';
import './index.css'

const Modal_report = ({ isModalOpen = false, handleOk, handleCancel, Title = 'Undefined', children }) => {

  return (

    <Modal
      title={`Generar Reporte de ${Title}`}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      // centered
      mask={true}
      okText='Generar'
      cancelText='Salir'
      style={{
        marginTop: 300,
      }}
    >
      {children}
    </Modal>

  );

};
export default Modal_report;