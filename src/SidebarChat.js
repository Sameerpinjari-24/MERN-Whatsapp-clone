import { Avatar } from '@mui/material'
import React from 'react'
import "./SidebarChat.css"
function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat_info">
            <h2>Sameeer</h2>
            <p>Hi there</p>
            </div>
        </div>
    )
}

export default SidebarChat
