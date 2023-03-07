import { useState} from 'react'
import { useCookies } from 'react-cookie'

const Modal = ({mode, setShowModal, getData, task}) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const editMode = mode ==='edit' ? true : false
    const [data, setData] = useState({
        user_email: editMode ? task.user_email : cookies.Email,
        title: editMode ? task.title : null,
        progress: editMode ? task.progress : null,
        date: editMode ? task.dete : new Date()
    })
   
    const postData = async(e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(data)
            })
            if (response === 201) {
                console.log('WORKED')
                setShowModal(false)
                getData()
            }
        } catch(err) {
            console.error(err)
        }
    }

    const editData = async(e) => {
        e.preventDefault()
        try {
           const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,{
                method: 'PUT',
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(data)
            })
            if(response.status === 201) {
                setShowModal(false)
                getData()
            }
        } catch (err) {
            console.error(err)
        }
    }



    const handleChange = (e) => {
        console.log('changing', e)
        const {name, value} = e.target

        setData(data => ({
            ...data,
            [name] : value
        }))
    }

    return (
    <div className="overlay">
        <div className="modal">
            <div className="form-title-container">
                <h3>{mode} a task</h3>
                <button onClick={() => setShowModal(false)}>x</button>
            </div>

            <form>
                <input 
                required 
                maxLength={30}
                placeholder="Enter Task"
                name= "title"
                value={data.title}
                onChange = {handleChange}
                />
                
                <br />
                
                <label for="range">Drag to select your current progress</label>
                <input 
                required
                type="range"
                id="range"
                min="0"
                max="100"
                name="progress"
                value={data.progress}
                onChange = {handleChange}
                />
                <input 
                className={mode}
                type="submit"
                onClick={editMode ? editData : postData}/>
            </form>
        </div>
    </div>
    )
    }
    export default Modal