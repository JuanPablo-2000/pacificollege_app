import "../styles/CardUser.css";
import PropTypes from "prop-types";

interface CardUserProps {
  clickHandler: (selected: any) => void;
  data: any;
}

const CardUser = ({ clickHandler, data }: CardUserProps) => {
  return (
    <div className="card" onClick={() => clickHandler(data)}>
    <div className="description">
        <p className="position-visa">{data.codigo}</p>
        <p>{data.nombres_b}</p>
        <p>{data.apellidos_b}</p>
        <p>{data.contrato}</p>
        <p>{data.actual_episodio}</p>
        <p>{data.ultimo_episodio}</p>
        <p>{data.telefono_b}</p>
        <p>{data.correo}</p>
      </div>
    </div>
  );
};

CardUser.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  data: PropTypes.any,
};

export default CardUser;
