import { Message } from '@/model/User.model';
import React, { useState } from 'react';

const Dashboard = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isSwitchLoading, setIsSwitchLoading] = useState(false)
    return (
        <div>
            dashboard
        </div>
    );
};

export default Dashboard;