import { AutoComplete } from 'antd';
import './index.css';


const AutoComp = ({ Options, onChange, placeholder}) => (

    <AutoComplete
        style={{
            width: 450,
            marginBottom: 20
        }}
        options={Options}
        placeholder={placeholder}
        filterOption={
            (inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        onChange={onChange}
      
    />
);
export default AutoComp;