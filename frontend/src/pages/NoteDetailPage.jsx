import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import RateLimitedUI from '../components/RateLimitedUI';
import toast from 'react-hot-toast';
import api from '../lib/axios';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';
import Navbar from '../components/Navbar';

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(null);

  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
      const fetchNote = async () => {
        try {
          const res = await api.get(`/notes/${id}`);
          setNote(res.data);
          console.log(res.data);
          setIsRateLimited(false);
        } catch (error) {
          console.error("Error fetching note:", error);
          if (error.response?.status === 429) {
            setIsRateLimited(true);
          } else {
            toast.error("Failed to load note");
          }
        } finally {
          setLoading(false);
        }
      }; fetchNote();
  }, [id]);

    console.log(note)

    const handleDelete = async() => {
      if (!window.confirm("Are you sure you want to delete this note?")) return;
      try {
        await api.delete(`/notes/${id}`);
        toast.success("Note deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting note:", error);
        toast.error("Failed to delete note");
      }
    }
    const handleSave = async () => {
      if (!note.title.trim() || !note.content.trim()) {
        toast.error("Please fill in title or content");
        return;
      }

      setSaving(true);

      try {
        await api.put(`/notes/${id}`, note) // Second argument is the body of the request, in this case the updated note
        toast.success("Note updated successfully");
      } catch (error) {
        console.error("Error updating note:", error);
        toast.error("Failed to update note");
      } finally {
        setSaving(false);
      }
      navigate("/");
    }
        if (loading) {
        return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
          <LoaderIcon className="animate-spin size-10" />
        </div>)
      }

  return (
    <>
        {isRateLimited && <RateLimitedUI />}
        <div className="min-h-screen bg-base-200">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon className="size-5" />
                  Back to notes
                </Link>
                <button onClick={handleDelete} className="btn btn-error btn-outline">
                  <Trash2Icon className="size-5" />
                  Delete Note
                </button>
              </div>
                <div className="card bg-base-100 border border-t-4 border-[#00FF9D]/50">
                  <div className="card-body">
                    <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text mb-1 px-2">Title</span>
                    </label>
                    <input type="text"
                    placeholder="Note title"
                    className="input input-bordered"
                    value={note.title}
                    onChange={(e) => setNote({...note, title: e.target.value})}
                    />
                  </div>
                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text mb-1 px-2">Content</span>
                    </label>
                    <textarea placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={note.content}
                    onChange={(e) => setNote({...note, content: e.target.value})} />
                  </div>
                  <div className='card-actions justify-end'>
                    <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                      {saving ? "Saving..." : "Save Note" }
                    </button>
                  </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default NoteDetailPage
