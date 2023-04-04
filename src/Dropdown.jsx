import React, { useState, useEffect } from "react";

function Dropdown() {
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estadoSelecionado, setEstadoSelecionado] = useState("");

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        setEstados(data);
      });
  }, []);

  const handleEstadoChange = (event) => {
    const sigla = event.target.value;
    setEstadoSelecionado(sigla);
    fetch(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`
    )
      .then((res) => res.json())
      .then((data) => {
        setCidades(data);
      });
  };

  return (
    <div>
      <select onChange={handleEstadoChange}>
        <option>Selecione um estado</option>
        {estados.map((estado) => (
          <option key={estado.id} value={estado.sigla}>
            {estado.nome}
          </option>
        ))}
      </select>
      {cidades.length > 0 && (
        <ul>
          {cidades.map((cidade) => (
            <li key={cidade.id}>{cidade.nome}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;