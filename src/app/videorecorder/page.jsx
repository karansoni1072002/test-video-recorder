'use client';
import React, { useState } from 'react'
import { VideoRecorder } from '../_components/VideoRecorder';
import { Modal } from '../_components/Modal'

const Recorder = () => {

    const [isModalOpen, setIsModalOpen] = useState(true)
    return (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <VideoRecorder />
        </Modal>
    )
}

export default Recorder