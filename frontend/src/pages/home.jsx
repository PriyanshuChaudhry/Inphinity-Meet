import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField, Container, Card, CardContent, Typography, Box, Snackbar, Alert } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideocamIcon from '@mui/icons-material/Videocam';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [error, setError] = useState("");

    const {addToUserHistory} = useContext(AuthContext);
    
    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) {
            setError("Please enter a meeting code");
            return;
        }
        try {
            await addToUserHistory(meetingCode)
            navigate(`/${meetingCode}`)
        } catch (err) {
            setError("Failed to join meeting");
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleJoinVideoCall();
        }
    }

    return (
        <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Navbar */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: { xs: '15px 20px', md: '20px 40px' },
                backdropFilter: 'blur(10px)',
                background: 'rgba(255, 255, 255, 0.1)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <img src="/favicon.ico" alt="Inphinity Meet Logo" style={{ height: '40px', width: 'auto' }} />
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', display: { xs: 'none', sm: 'block' } }}>
                        Inphinity Meet
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton 
                        onClick={() => navigate("/history")}
                        sx={{ 
                            color: 'white',
                            '&:hover': { background: 'rgba(255, 255, 255, 0.2)' }
                        }}
                    >
                        <RestoreIcon />
                    </IconButton>
                    <Typography sx={{ color: 'white', display: { xs: 'none', sm: 'block' } }}>History</Typography>

                    <IconButton 
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        sx={{ 
                            color: 'white', 
                            ml: 1,
                            '&:hover': { background: 'rgba(255, 255, 255, 0.2)' }
                        }}
                    >
                        <LogoutIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 'calc(100vh - 100px)',
                gap: 4,
                py: 4
            }}>
                {/* Left Panel - Main Card */}
                <Box sx={{ 
                    flex: 1, 
                    width: '100%',
                    maxWidth: { xs: '100%', md: '600px' }
                }}>
                    <Card sx={{ 
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: 4,
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        overflow: 'visible'
                    }}>
                        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                            <Typography variant="h4" sx={{ 
                                fontWeight: 'bold',
                                color: '#333',
                                mb: 2,
                                fontSize: { xs: '1.75rem', md: '2.125rem' }
                            }}>
                                Start Your Meeting
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#666', mb: 4 }}>
                                Enter a meeting code to join or start a new video call
                            </Typography>

                            <Box sx={{ mb: 3 }}>
                                <TextField 
                                    fullWidth
                                    value={meetingCode}
                                    onChange={e => {
                                        setMeetingCode(e.target.value)
                                        setError("")
                                    }}
                                    onKeyPress={handleKeyPress}
                                    label="Meeting Code" 
                                    variant="outlined"
                                    placeholder="Enter meeting code"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&:hover fieldset': {
                                                borderColor: '#667eea',
                                            },
                                            '&.Mui-focused fieldset': {
                                                borderColor: '#667eea',
                                            }
                                        }
                                    }}
                                />
                            </Box>

                            <Button 
                                fullWidth
                                variant="contained" 
                                size="large"
                                onClick={handleJoinVideoCall}
                                startIcon={<VideocamIcon />}
                                sx={{
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    borderRadius: 2,
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                        boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
                                        transform: 'translateY(-2px)',
                                    },
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                Join Meeting
                            </Button>

                            <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                                <Typography variant="body2" sx={{ color: '#999', textAlign: 'center' }}>
                                    High-quality video calls with end-to-end encryption
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

                {/* Right Panel - Image */}
                <Box sx={{ 
                    flex: 1,
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Box sx={{ 
                        width: '100%',
                        maxWidth: 400,
                        textAlign: 'center'
                    }}>
                        <img 
                            src="/logo.png" 
                            alt="Inphinity Meet Logo" 
                            style={{ 
                                width: '100%', 
                                maxWidth: '300px', 
                                height: 'auto',
                                opacity: 0.8,
                                filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))'
                            }} 
                        />
                        <Typography variant="h5" sx={{ color: 'white', mt: 4, fontWeight: 'bold' }}>
                            Premium Video Experience
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                            Connect with anyone, anywhere in the world
                        </Typography>
                    </Box>
                </Box>
            </Container>

            {/* Error Snackbar */}
            <Snackbar 
                open={!!error} 
                autoHideDuration={3000} 
                onClose={() => setError("")}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity="error" onClose={() => setError("")}>
                    {error}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default withAuth(HomeComponent)
