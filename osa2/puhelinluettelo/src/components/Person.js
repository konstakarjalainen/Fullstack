const Person = (props) => {
    return (
        <div>
            <p>
                {props.name} {props.number} <button onClick={props.deletePerson}>delete</button>
            </p>  
        </div>
    )
}

export default Person