import { ArrowLeftIcon } from 'lucide-react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios';


const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title.trim() || !content.trim()) {
      toast.error("Please fill in all fields");
      return; // Do not forget to return here to prevent further execution!
    }

    try {
      await api.post("/notes", { title, content});
      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if(error.response?.status === 429) {
        toast.error("You are creating notes too fast! Please wait a moment and try again.", {
          duration: 4000,
          icon: "💀"
        });
      } else {
      toast.error("Failed to create note");
      console.error("Error creating note:", error);}
    } finally{
      setLoading(false);
    }


  };
  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to notes
          </Link>
          <div className="card bg-base-100 border border-t-4 border-[#00FF9D]/50">
            <div className="card-body">
              <h2 className="card-title text-2xl font-semibold mb-4">Create New Note</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Title</span>
                    </label>
                    <input type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text">Content</span>
                    </label>
                    <textarea placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
                  </div>
                  <div className='card-actions justify-end'>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Creating..." : "Create note" }
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage

