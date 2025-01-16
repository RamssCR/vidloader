/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function InputError({error}) {
    const bg = error.includes('successfully') ? '#e6fff0' : '#ffdddd'
    const color = error.includes('successfully') ? '#00e961' : '#e70909'

    return (
        <div className="error-display" style={{backgroundColor: bg, borderLeftColor: color}}>
            <span className="mark" style={{backgroundColor: color}}><span className="x">X</span></span>
            <span className="error" style={{color}}>{error}</span>
        </div>
    )
}

export default InputError