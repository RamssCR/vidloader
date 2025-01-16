import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Video from '../src/components/Video'

test('renders a video component and the options icon image', () => {
    const mockedVideo = {
        id: '6733998eb6735084d6bc048d',
        title: 'Jomekka - Eighto',
        category: 'Music',
        description: 'A music video made by Jomekka. Enjoy :)',
        videoName: 'EIGHTO_-_Jomekka_[Dubstep_Midtempo].mp4',
        duration: '03:58',
        thumbnail: 'EIGHTO_-_Jomekka_[Dubstep_Midtempo].jpg',
        uploadedAt: '2024-11-12T18:08:14.929+00:00',
        user: '672be6b045af6d3665bf1816'
    }

    render(
        <MemoryRouter>
            <Video video={mockedVideo} />
        </MemoryRouter>
    )
    const title = screen.getByText(mockedVideo.title)
    expect(title).toBeInTheDocument()

    const thumbnail = screen.getByRole('img', { name: /options/i })
    expect(thumbnail).toBeInTheDocument()
    expect(thumbnail).toBeVisible()
})