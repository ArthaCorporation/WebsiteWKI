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
import { generateSlug } from '@/lib/utils'

interface BeritaItem {
  id: string
  title: string
  content: string
  imageUrl: string
  date: string
  slug: string
}

interface AdminUser {
  uid: string
  email: string
  displayName: string
  createdAt?: string
  lastLogin?: string
}

type Tab = 'berita' | 'admin'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('berita')
  const [currentUid, setCurrentUid] = useState<string | null>(null)

  // ── Berita state ────────────────────────────────────────────────────────────
  const [beritaList, setBeritaList] = useState<BeritaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    slug: '',
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // ── Admin users state ───────────────────────────────────────────────────────
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [usersError, setUsersError] = useState<string | null>(null)
  const [showUserForm, setShowUserForm] = useState(false)
  const [userForm, setUserForm] = useState({ email: '', password: '', displayName: '' })
  const [userSubmitting, setUserSubmitting] = useState(false)

  // ── Auth ─────────────────────────────────────────────────────────────────────
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
        setCurrentUid(user.uid)
        setLoading(false)
        fetchBerita()
      }
    })
    return () => unsubscribe()
  }, [router, fetchBerita])

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin')
  }

  // ── Berita handlers ──────────────────────────────────────────────────────────
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const fd = new FormData()
    fd.append('file', file)
    const response = await fetch('/api/upload', { method: 'POST', body: fd })
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Upload failed: ${errorData.error}`)
    }
    const data = await response.json()
    return data.url as string
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      let imageUrl = formData.imageUrl
      if (imageFile) imageUrl = await uploadToCloudinary(imageFile)

      const beritaData = {
        title: formData.title,
        content: formData.content,
        date: formData.date,
        slug: formData.slug || generateSlug(formData.title),
        imageUrl: imageUrl || '',
        createdAt: Timestamp.now(),
      }

      if (editingId) {
        await updateDoc(doc(db, 'berita', editingId), beritaData)
      } else {
        await addDoc(collection(db, 'berita'), beritaData)
      }

      setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], slug: '', imageUrl: '' })
      setImageFile(null)
      setShowForm(false)
      setEditingId(null)
      fetchBerita()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan'
      alert(`Gagal menyimpan berita: ${message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (item: BeritaItem) => {
    setFormData({ title: item.title, content: item.content, date: item.date, slug: item.slug, imageUrl: item.imageUrl || '' })
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

  // ── Admin users handlers ─────────────────────────────────────────────────────
  const fetchAdminUsers = useCallback(async () => {
    setUsersLoading(true)
    setUsersError(null)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setAdminUsers(data.users)
    } catch (err: unknown) {
      setUsersError(err instanceof Error ? err.message : 'Gagal memuat daftar admin')
    } finally {
      setUsersLoading(false)
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'admin') fetchAdminUsers()
  }, [activeTab, fetchAdminUsers])

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault()
    setUserSubmitting(true)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userForm),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setUserForm({ email: '', password: '', displayName: '' })
      setShowUserForm(false)
      fetchAdminUsers()
    } catch (err: unknown) {
      alert(`Gagal membuat admin: ${err instanceof Error ? err.message : 'Terjadi kesalahan'}`)
    } finally {
      setUserSubmitting(false)
    }
  }

  const handleDeleteUser = async (uid: string, email: string) => {
    if (uid === currentUid) {
      alert('Anda tidak dapat menghapus akun Anda sendiri.')
      return
    }
    if (!confirm(`Hapus admin "${email}"? Tindakan ini tidak dapat dibatalkan.`)) return
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid }),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error)
      }
      fetchAdminUsers()
    } catch (err: unknown) {
      alert(`Gagal menghapus admin: ${err instanceof Error ? err.message : 'Terjadi kesalahan'}`)
    }
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

      {/* Tab navigation */}
      <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex gap-0 max-w-6xl mx-auto">
          {(['berita', 'admin'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? 'border-[#0B5E8E] text-[#0B5E8E]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'berita' ? 'Kelola Berita' : 'Kelola Admin'}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* ── Berita tab ── */}
        {activeTab === 'berita' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Kelola Berita</h2>
              <button
                onClick={() => {
                  setShowForm(true)
                  setEditingId(null)
                  setFormData({ title: '', content: '', date: new Date().toISOString().split('T')[0], slug: '', imageUrl: '' })
                }}
                className="bg-[#0B5E8E] text-white px-6 py-2 rounded-lg hover:bg-[#0a527c] transition-colors"
              >
                + Tambah Berita
              </button>
            </div>

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
          </>
        )}

        {/* ── Admin users tab ── */}
        {activeTab === 'admin' && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Kelola Admin</h2>
              <button
                onClick={() => setShowUserForm(true)}
                className="bg-[#0B5E8E] text-white px-6 py-2 rounded-lg hover:bg-[#0a527c] transition-colors"
              >
                + Tambah Admin
              </button>
            </div>

            {usersError && usersError.includes('FIREBASE_SERVICE_ACCOUNT_KEY') ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="font-semibold text-amber-800 mb-2">Setup diperlukan</h3>
                <p className="text-amber-700 text-sm mb-3">
                  Untuk mengelola akun admin, tambahkan variabel berikut ke file <code className="bg-amber-100 px-1 rounded">.env.local</code>:
                </p>
                <pre className="bg-amber-100 text-amber-900 text-xs p-3 rounded overflow-x-auto">
                  FIREBASE_SERVICE_ACCOUNT_KEY=&#123;&quot;type&quot;:&quot;service_account&quot;,...&#125;
                </pre>
                <p className="text-amber-700 text-sm mt-3">
                  Dapatkan kunci dari <strong>Firebase Console → Project Settings → Service Accounts → Generate new private key</strong>.
                  Salin seluruh isi file JSON ke dalam satu baris sebagai nilai variabel tersebut.
                </p>
              </div>
            ) : usersError ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-red-700">
                {usersError}
              </div>
            ) : (
              <>
                {showUserForm && (
                  <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Tambah Admin Baru</h3>
                    <form onSubmit={handleCreateUser} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama (opsional)</label>
                        <input
                          type="text"
                          value={userForm.displayName}
                          onChange={(e) => setUserForm({ ...userForm, displayName: e.target.value })}
                          placeholder="cth: Pak Budi"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          value={userForm.email}
                          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                          type="password"
                          value={userForm.password}
                          onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                          required
                          minLength={6}
                          placeholder="Minimal 6 karakter"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5E8E]"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          disabled={userSubmitting}
                          className="bg-[#0B5E8E] text-white px-6 py-2 rounded-lg hover:bg-[#0a527c] transition-colors disabled:opacity-50"
                        >
                          {userSubmitting ? 'Membuat...' : 'Buat Admin'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowUserForm(false)}
                          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          Batal
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {usersLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0B5E8E]"></div>
                  </div>
                ) : adminUsers.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-12 text-center text-gray-500">
                    <span className="text-5xl block mb-4">👤</span>
                    <p>Belum ada data admin.</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-6 py-3 text-gray-600 font-semibold">Email</th>
                          <th className="text-left px-6 py-3 text-gray-600 font-semibold">Nama</th>
                          <th className="text-left px-6 py-3 text-gray-600 font-semibold">Dibuat</th>
                          <th className="px-6 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {adminUsers.map((user) => (
                          <tr key={user.uid} className={user.uid === currentUid ? 'bg-blue-50' : ''}>
                            <td className="px-6 py-4 font-medium text-gray-800">
                              {user.email}
                              {user.uid === currentUid && (
                                <span className="ml-2 text-xs bg-[#0B5E8E] text-white px-2 py-0.5 rounded-full">Anda</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-gray-600">{user.displayName || '—'}</td>
                            <td className="px-6 py-4 text-gray-500">
                              {user.createdAt ? new Date(user.createdAt).toLocaleDateString('id-ID') : '—'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {user.uid !== currentUid && (
                                <button
                                  onClick={() => handleDeleteUser(user.uid, user.email)}
                                  className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                                >
                                  Hapus
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
