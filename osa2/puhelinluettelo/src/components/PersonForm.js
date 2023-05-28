const PersonForm = (props) => {
    return(
        <form onSubmit={props.onSubmit}>
        <div>name: <input value={props.name} onChange={props.nameOnChange}/></div>
        <div>number: <input value={props.number} onChange={props.numOnChange}/> </div>
        <div><button type={props.type}>add</button> </div>
        </form>
    )
}

export default PersonForm
    