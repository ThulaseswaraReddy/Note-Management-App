import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {
    const [notes, setNotes] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [editId,setEditId]= useState(null)
    const token = localStorage.getItem("token")
    const navigate=useNavigate()
    const getNotes = async () => {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes/`, {
            headers: {
                "authorization": token
            }
        })
        setNotes(res.data)
    }

    const addtask = async () => {
     try{
    if (!title || !content) {
        alert("Please enter title and content");
        return;
    }
        await axios.post(`${import.meta.env.VITE_API_URL}/notes/add`, {
            title, content
        }, {
            headers: {
                "authorization": token,
            }
        })
        setTitle("");
        setContent("");
        getNotes();
    }catch(error){
   alert(error.response?.data?.msg || error.message);
}
    }
  
    const edit=async(note)=>{
        setTitle(note.title)
        setContent(note.content)
        setEditId(note._id)
    }
    const update= async()=>{

    if (!title || !content) {
        alert("Please enter title and content");
        return;
    }
        await axios.put(`${import.meta.env.VITE_API_URL}/notes/${editId}`,{
            title,content
        },{
            headers:{
                "authorization":token
            }
        })
        setTitle("")
        setContent("")
        setEditId(null)
        getNotes()
    }


    const deleteTask = async (id) => {
        await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}`, {
            headers: {
                "authorization": token,
            }
        })
        getNotes();
    }
    const logout= async()=>{
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
         <div className="container mt-4">
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h1>Notes App</h1>

      <button
        className="btn btn-dark"
        onClick={logout}
      >
        Logout
      </button>
    </div>

    <div className="card shadow p-4 mb-4">
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        rows="4"
        placeholder="Enter Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {editId ? (
        <button
          className="btn btn-warning"
          onClick={update}
        >
          Update Note
        </button>
      ) : (
        <button
          className="btn btn-primary"
          onClick={addtask}
        >
          Add Note
        </button>
      )}
    </div>

    <div className="row">
  {notes.map((note) => (
    <div className="col-12 mb-3" key={note._id}>
      <div className="card shadow">
        <div className="card-body">
          <h3 className="card-title">
            {note.title}
          </h3>

          <p className="card-text">
            {note.content}
          </p>

          <button
            className="btn btn-success me-2"
            onClick={() => edit(note)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => deleteTask(note._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
  </div>
    );
}

export default Home;