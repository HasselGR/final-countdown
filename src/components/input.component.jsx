import './input.styles.css';


export const Input = ({name, change, value}) => {
    return(
        <input name={name}
        type={name==='date'? 'date': (name === 'time'? 'time': '')}
        value={value} 
        placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
        onChange={change}
        ></input>
    )
}