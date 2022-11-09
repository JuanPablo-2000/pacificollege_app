import "../styles/Search.css";
import imgSearch from "../static/img/lupa.png";
import { useState } from "react";

// Interfaces
interface ISearchProps {
  search: {
    value: string;
    onChange: (value: string) => void;
  };
  state: {
    value: string;
    onChange: (value: string) => void;
  };
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  handleOnSearch: () => void;
}

const Search = ({ field, search, state, handleOnSearch }: ISearchProps) => {

  return (
    <div className="position-search">
      <input
        onChange={(event) => search!.onChange(event.target.value!)}
        className="search"
        type="text"
        placeholder="Search..."
      />
      <img src={imgSearch} alt="" onClick={handleOnSearch} />

      <select
        className="select-drop"
        onChange={(e) => state?.onChange(e.target.value)}
        defaultValue={"default"}
      >
        <option value="default" disabled>Selected State</option>
        <option value="CADUCADO">Caducado</option>
        <option value="DESTRATE">Destrate</option>
        <option value="CERTIFICADO">Certificado</option>
        <option value="INACTIVO">Inactivo</option>
        <option value="ACTIVO">Activo</option>
      </select>
      <select
        className="select-drop"
        onChange={(e) => field.onChange(e.target.value)}
        defaultValue={"default"}
      >
        <option value="default" disabled>Selected filter</option>
        <option value="nombres_b">Name</option>
        <option value="apellidos_b">LastName</option>
        <option value="apellids_titular">LastTitular</option>
        <option value="actual_episodio">Episode</option>
        <option value="codigo">No. Visa</option>
        <option value="cedula">Identification</option>
      </select>
    </div>
  );
};

export default Search;
