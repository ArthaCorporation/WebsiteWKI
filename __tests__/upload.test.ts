import { POST } from '@/app/api/upload/route'

jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn().mockResolvedValue({
        secure_url: 'https://res.cloudinary.com/test/image/upload/wki_berita/test.jpg',
      }),
    },
  },
}))

function makeRequest(formData: FormData): Request {
  return new Request('http://localhost/api/upload', {
    method: 'POST',
    body: formData,
  })
}

describe('POST /api/upload', () => {
  it('returns 400 when no file is provided', async () => {
    const formData = new FormData()
    const response = await POST(makeRequest(formData))
    expect(response.status).toBe(400)
    const data = await response.json()
    expect(data.error).toBe('No file provided')
  })

  it('returns the Cloudinary URL on success', async () => {
    const formData = new FormData()
    const file = new File(['fake-image-bytes'], 'photo.jpg', { type: 'image/jpeg' })
    formData.append('file', file)
    const response = await POST(makeRequest(formData))
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(data.url).toBe('https://res.cloudinary.com/test/image/upload/wki_berita/test.jpg')
  })

  it('returns 500 when Cloudinary throws', async () => {
    const { v2 } = await import('cloudinary')
    ;(v2.uploader.upload as jest.Mock).mockRejectedValueOnce(new Error('Cloudinary down'))
    const formData = new FormData()
    const file = new File(['bytes'], 'photo.jpg', { type: 'image/jpeg' })
    formData.append('file', file)
    const response = await POST(makeRequest(formData))
    expect(response.status).toBe(500)
    const data = await response.json()
    expect(data.error).toBe('Cloudinary down')
  })
})
