import { useState } from "react";
import InputMask from "react-input-mask";
import { TextField, Button } from "@material-ui/core";

const App = () => {
  const [fields, setFields] = useState([
    {
      name: "Email",
      value: null,
      mask: null,
      expReg: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
      validate: false,
    },
    {
      name: "Nombre",
      value: null,
      mask: null,
      expReg: null,
      validate: true,
    },
    {
      name: "Apellido",
      value: null,
      mask: null,
      expReg: null,
      validate: true,
    },
    {
      name: "Observaciones",
      value: null,
      mask: null,
      expReg: null,
      validate: true,
    },
    {
      name: "NumTel",
      value: null,
      mask: "9999999999999",
      expReg: /[0-9]/,
      validate: false,
    },
    {
      name: "CUIT",
      value: null,
      mask: "pq-99999999-9",
      formatChars: {
        "*": "[A-Za-z0-9]",
        p: "[2-3]",
        q: "[0-4]",
      },
      expReg: /^\d{2}-\d{8}-\d{1}$/,
      validate: false,
    },
    {
      name: "DNI",
      value: null,
      mask: "9999999999",
      expReg: /^([0-9])/,
      validate: false,
    },
  ]);

  const mostrarCartelito = () => {
    alert("EXCELENTE!");
  };

  const disabled = () => {
    return fields.some((item) => item.validate === false);
  };

  const handleChange = (value, i) => {
    const auxFields = [...fields];
    auxFields[i].value = value;
    setFields(auxFields);
  };

  const handleBlur = (value, expReg, name, i) => {
    const expresion = new RegExp(expReg);
    const auxFields = [...fields];
    if (expReg !== null) {
      if (!expresion.test(value)) {
        auxFields[i].validate = false;
        auxFields[i].error = `El campo ${name} no posee un formato válido.`;
      } else {
        auxFields[i].validate = true;
        auxFields[i].error = ``;
      }

      setFields(auxFields);
    }
  };

  const formatChars = {
    9: "[0-9]",
    a: "[A-Za-z]",
    "*": "[A-Za-z0-9]",
    p: "[2-3]",
    q: "[0-4]",
  };

  return (
    <div>
      {fields.map((field, i) => (
        <div>
          <br />
          <span>{field.name}: </span>
          <br />
          <InputMask
            formatChars={formatChars}
            maskChar=" "
            mask={field.mask}
            onBlur={(e) =>
              handleBlur(e.target.value, field.expReg, field.name, i)
            }
            onChange={(e) => handleChange(e.target.value, i)}
            value={fields[i].value}
          >
            {(inputProps) => <TextField {...inputProps} />}
          </InputMask>
          <br />
          <label style={{ color: "red" }}>{field.error}</label>
          <br />
        </div>
      ))}
      <Button onClick={() => mostrarCartelito()} disabled={disabled()}>
        Guardar
      </Button>
    </div>
  );
};

export default App;
