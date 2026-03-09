'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

interface BeritaItem {
  id: string
  title: string
  content: string
  imageUrl: string
  date: string
  slug: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    slug: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchBerita = useCallback(async () => {
    try {
      const snapshot = await getDocs(collection(db, 'berita'))
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as BeritaItem))
      setBeritaList(items)
    } catch (err) {
      console.error('Error fetching berita:', err)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin')
      } else {
        setLoading(false)
        fetchBerita()
      }
    })
    return () => unsubscribe()
  }, [router, fetchBerita])

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary environment variables are not configured.')
    }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: 'POST', body: formData }
    )
    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`)
    }
    const data = await response.json()
    return data.secure_url as string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      let imageUrl = ''

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile)
      }

      const beritaData = {
        title: formData.title,
        content: formData.content,
        date: formData.date,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        imageUrl: imageUrl || '',
        createdAt: Timestamp.now(),
      }

      if (editingId) {
        await updateDoc(doc(db, 'berita', editingId), beritaData)
      } else {
        await addDoc(collection(db, 'berita'), beritaData)
      }

      setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], slug: '' })
      setImageFile(null)
      setShowForm(false)
      setEditingId(null)
      fetchBerita()
    } catch (err) {
      console.error('Error saving berita:', err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (item: BeritaItem) => {
    setFormData({
      title: item.title,
      content: item.content,
      date: item.date,
      slug: item.slug,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus berita ini?')) return
    try {
      await deleteDoc(doc(db, 'berita', id))
      fetchBerita()
    } catch (err) {
      console.error('Error deleting berita:', err)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0B5E8E]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#0B5E8E] text-white px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Admin Dashboard — PT. Wijaya Kencana Indonesia</h1>
        <button
          onClick={handleLogout}
          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded text-sm transition-colors"
        >
          Keluar
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Kelola Berita</h2>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], slug: '' }) }}
            className="bg-[#0B5E8E] text-white px-6 py-2 rounded-lg hover:bg-[#0a527c] transition-colors"
          >
            + Tambah Berita
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {editingId ? 'Edit Berita' : 'Tambah Berita Baru'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="otomatis dari judul jika kosong"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konten</label>
                <textarea
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0B5E8E] text-white px-6 py-2 rounded-lg hover:bg-[#0a527c] transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Menyimpan...' : editingId ? 'Perbarui' : 'Simpan'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setEditingId(null) }}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Berita List */}
        {beritaList.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
            <span className="text-5xl block mb-4">📰</span>
            <p>Belum ada berita. Klik &quot;Tambah Berita&quot; untuk menambahkan.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {beritaList.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6 flex justify-between items-start">
                <div className="flex-1 min-w-0 mr-4">
                  <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.date}</p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.content}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-[#FFC107] text-gray-800 px-4 py-2 rounded text-sm hover:bg-[#ffb300] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
