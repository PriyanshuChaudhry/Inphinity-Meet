import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    Box, 
    CardContent, 
    Button, 
    Typography, 
    Container,
    IconButton,
    CircularProgress,
    Chip,
    Paper
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HistoryIcon from '@mui/icons-material/History';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const [loading, setLoading] = useState(true);
    const routeTo = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, [])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();
        return `${day}/${month}/${year}`
    }

    let formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 3
        }}>
            {/* Header */}
            <Container maxWidth="lg">
                <Paper sx={{ 
                    p: 2, 
                    mb: 3, 
                    display: 'flex', 
                    alignItems: 'center',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 2
                }}>
                    <IconButton 
                        onClick={() => routeTo("/home")}
                        sx={{ 
                            mr: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <HistoryIcon sx={{ fontSize: 32, mr: 1, color: '#667eea' }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
                        Meeting History
                    </Typography>
                    <Chip 
                        label={`${meetings.length} meeting${meetings.length !== 1 ? 's' : ''}`} 
                        sx={{ ml: 'auto', background: '#667eea', color: 'white', fontWeight: 'bold' }}
                    />
                </Paper>

                {/* Loading State */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                        <CircularProgress size={60} sx={{ color: 'white' }} />
                    </Box>
                ) : meetings.length === 0 ? (
                    /* Empty State */
                    <Card sx={{ 
                        textAlign: 'center', 
                        py: 8,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <VideocamIcon sx={{ fontSize: 100, color: '#ccc', mb: 2 }} />
                        <Typography variant="h5" sx={{ mb: 2, color: '#666' }}>
                            No Meeting History Yet
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 3, color: '#999' }}>
                            Your past meetings will appear here
                        </Typography>
                        <Button 
                            variant="contained" 
                            onClick={() => routeTo("/home")}
                            startIcon={<VideocamIcon />}
                            sx={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                px: 4,
                                py: 1.5,
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                }
                            }}
                        >
                            Start Your First Meeting
                        </Button>
                    </Card>
                ) : (
                    /* Meeting List */
                    <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                        gap: 3
                    }}>
                        {meetings.map((meeting, index) => (
                            <Card 
                                key={index}
                                sx={{ 
                                    background: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: 3,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 3 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <VideocamIcon sx={{ 
                                            fontSize: 40, 
                                            color: 'white',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            borderRadius: 2,
                                            p: 1
                                        }} />
                                        <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold', color: '#333' }}>
                                            Meeting
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" sx={{ color: '#999', mb: 0.5 }}>
                                            Meeting Code
                                        </Typography>
                                        <Typography 
                                            variant="h6" 
                                            sx={{ 
                                                fontWeight: 'bold', 
                                                color: '#667eea',
                                                fontFamily: 'monospace',
                                                letterSpacing: 1
                                            }}
                                        >
                                            {meeting.meetingCode}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                        <CalendarTodayIcon sx={{ fontSize: 18, color: '#999' }} />
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            {formatDate(meeting.date)}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <HistoryIcon sx={{ fontSize: 18, color: '#999' }} />
                                        <Typography variant="body2" sx={{ color: '#666' }}>
                                            {formatTime(meeting.date)}
                                        </Typography>
                                    </Box>

                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() => routeTo(`/${meeting.meetingCode}`)}
                                        sx={{
                                            mt: 3,
                                            borderColor: '#667eea',
                                            color: '#667eea',
                                            fontWeight: 'bold',
                                            '&:hover': {
                                                borderColor: '#764ba2',
                                                background: 'rgba(102, 126, 234, 0.1)'
                                            }
                                        }}
                                    >
                                        Rejoin Meeting
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                )}
            </Container>
        </Box>
    )
}
