import { Select } from "antd";
import "./index.css";

export function DropMenu({ items, text, value , onChange,disabled,clasname="dropdowngroup"}) {

  return (
    <div className={clasname}>
      <Select
        options={items}
        onChange={onChange}
      
        placeholder={text}
        value={value}
        className="drow"
        disabled={disabled}

      ></Select>
    </div>
  );
}