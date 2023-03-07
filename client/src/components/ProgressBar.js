const ProgressBar = ({ progress }) => {
    return (
    <div className="outer-bar">
        <div
         className="inner-bar"
         style = {{width : `${progress}%`, backgroundColor: 'lightblue'}}>
        </div>
    </div>
    )
    }
    export default ProgressBar