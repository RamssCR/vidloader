import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import VideoDetails from '../components/VideoDetails'

test('renders the video description component', () => {
    const title = 'Video A'
    const uploadedAt = 'Oct. 31, 2024'
    const description = 'A mocked description for a mocked video'
    const category = 'Testing'

    render(
        <MemoryRouter>
            <VideoDetails title={title} uploadedAt={uploadedAt} description={description} category={category} />
        </MemoryRouter>
    )

    const founDescription = screen.getByText(description)
    expect(founDescription).toBeInTheDocument()

    const foundCategory = screen.getByText(category)
    expect(foundCategory).toBeTypeOf('object')
})