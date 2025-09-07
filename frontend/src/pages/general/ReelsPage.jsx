import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

// Custom hook for video autoplay with Promise handling
const useVideoAutoPlay = (threshold = 0.7, isGloballyMuted) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const playPromiseRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = isGloballyMuted;
        }
    }, [isGloballyMuted])

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    handlePlay();
                } else {
                    handlePause();
                }
            },
            { threshold }
        );

        observer.observe(video);
        return () => {
            observer.disconnect();
            // Clean up any pending promises
            if (playPromiseRef.current) {
                playPromiseRef.current.catch(() => { });
            }
        };
    }, [threshold]);

    const handlePlay = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            // Wait for any existing play promise to resolve first
            if (playPromiseRef.current) {
                await playPromiseRef.current.catch(() => { }); // Ignore errors from previous attempts
            }

            playPromiseRef.current = video.play();
            await playPromiseRef.current;

            setIsPlaying(true);
            playPromiseRef.current = null;
        } catch (error) {
            console.log('Video play interrupted or failed:', error);
            setIsPlaying(false);
            playPromiseRef.current = null;
        }
    };

    const handlePause = async () => {
        const video = videoRef.current;
        if (!video) return;

        try {
            // Wait for any pending play promise to complete before pausing
            if (playPromiseRef.current) {
                await playPromiseRef.current.catch(() => { }); // Wait but ignore errors
                playPromiseRef.current = null;
            }

            video.pause();
            setIsPlaying(false);
        } catch (error) {
            console.log('Video pause failed:', error);
        }
    };

    const togglePlay = async () => {
        if (isPlaying) {
            await handlePause();
        } else {
            await handlePlay();
        }
    };

    return { videoRef, isPlaying, togglePlay };
};

// Reel component
const ReelItem = ({ reel, index, isGloballyMuted, setIsGloballyMuted }) => {
    const { videoRef, isPlaying, togglePlay } = useVideoAutoPlay(0.6, isGloballyMuted); // Slightly lower threshold
    const [hasError, setHasError] = useState(false);

    const handleVideoError = (e) => {
        console.log('Video error:', e);
        setHasError(true);
    };

    const handleVideoLoad = () => {
        setHasError(false);
    };

    return (
        <div className="reel-item h-screen w-full relative bg-black flex items-center justify-center">
            {/* Video with error handling */}
            <video
                ref={videoRef}
                src={reel.video}
                className="h-full w-full object-cover cursor-pointer"
                onClick={togglePlay}
                muted={isGloballyMuted}
                loop
                playsInline
                preload="metadata"
                onError={handleVideoError}
                onLoadStart={handleVideoLoad}
                onLoadedData={handleVideoLoad}
            />

            {/* Error fallback */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center text-white">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-lg font-medium">Video unavailable</p>
                        <p className="text-sm text-gray-400 mt-1">Unable to load content</p>
                    </div>
                </div>
            )}

            {/* Play/Pause Overlay */}
            {!isPlaying && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 rounded-full p-4 backdrop-blur-sm">
                        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Mute/Unmute Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsGloballyMuted(!isGloballyMuted);
                }}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors hover:bg-black/70 z-10"
            >
                {isGloballyMuted ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-4 z-10">
                {/* Like Button */}
                <button className="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all hover:bg-red-500/80 hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs mt-1 text-center">{reel.likes || '0'}</span>
                </button>

                {/* Share Button */}
                <button className="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all hover:bg-blue-500/80 hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                </button>
            </div>

            {/* Bottom Partner Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-16">
                <div className="flex items-end justify-between">
                    {/* Content Info */}
                    <div className="flex-1 mr-4">
                        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">
                            {reel.name || "Amazing product showcase"}
                        </h3>
                        <p className="text-gray-200 text-sm mb-3 line-clamp-2">
                            {reel.description || "Discover this incredible offer from our partner"}
                        </p>
                        <div className="flex gap-4 *:rounded *:px-2 *:py-1 text-white *:min-w-[6rem] *:text-center">
                            <Link to={`/partner/profile/${reel.createdBy}`} className="bg-blue-600">
                                Visit-Store
                            </Link>
                            <Link to={`/products/${reel.productId}`} className="bg-green-500">
                                Visit-Item
                            </Link>
                        </div>
                    </div>

                    {/* Partner Profile */}
                    {/* <div className="flex items-center space-x-3">
                        <div className="relative">
                            <img
                                src={reel.partner.logo}
                                alt={reel.partner.name}
                                className="w-12 h-12 rounded-full border-2 border-white object-cover bg-white"
                                onError={(e) => {
                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMCIgeT0iMTAiPgo8cGF0aCBkPSJNMTkgMjFWNUEyIDIgMCAwMDE3IDNIN0EyIDIgMCAwMDUgNVYyMU0xOSAyMUgyM00xOSAyMUgxNE05IDIxSDVNOSAyMUgxNE05IDdIMU05IDExSDFNMTQgN0gxTTE0IDExSDEiIHN0cm9rZT0iIzlDQTNBRiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHN2Zz4KPHN2Zz4=';
                                }}
                            />
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div> */}
                </div>

                {/* Partner Action Buttons */}
                {/* <div className="flex items-center space-x-3 mt-4">
                    <button
                        onClick={() => window.open(reel.partner.profileUrl, '_blank')}
                        className="bg-white/90 hover:bg-white text-gray-900 font-medium py-2 px-4 rounded-full transition-all hover:scale-105 text-sm"
                    >
                        Visit Store
                    </button>
                    <button
                        onClick={() => window.open(reel.partner.purchaseUrl, '_blank')}
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-full transition-all hover:scale-105 text-sm"
                    >
                        Shop Now
                    </button>
                </div> */}
            </div>

            {/* Video Progress Bar */}
            {!hasError && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-600/30 overflow-hidden">
                    <div
                        className="h-full bg-white transition-all duration-300 ease-linear"
                        style={{
                            width: isPlaying ? '100%' : '0%',
                            transitionDuration: reel.duration ? `${reel.duration}s` : '30s'
                        }}
                    />
                </div>
            )}
        </div>
    );
};

// Main Reels Component
export default function ReelsPage() {
    const [reels, setReels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [isGloballyMuted, setIsGloballyMuted] = useState(true);
    const containerRef = useRef(null);

    // Mock data
    const mockReels = [
        {
            id: 1,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            title: "Amazing Wireless Earbuds",
            description: "Experience crystal clear sound with our premium wireless earbuds",
            likes: 1234,
            duration: 15,
            partner: {
                name: "TechGear Pro",
                logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
                profileUrl: "https://example.com/techgear",
                purchaseUrl: "https://example.com/buy/earbuds"
            }
        },
        {
            id: 2,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            title: "Stylish Running Shoes",
            description: "Run in comfort and style with our latest athletic collection",
            likes: 856,
            duration: 20,
            partner: {
                name: "SportZone",
                logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop&crop=center",
                profileUrl: "https://example.com/sportzone",
                purchaseUrl: "https://example.com/buy/shoes"
            }
        },
        {
            id: 3,
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            title: "Premium Coffee Blend",
            description: "Wake up to the perfect morning with our artisanal coffee",
            likes: 2341,
            duration: 18,
            partner: {
                name: "Coffee Masters",
                logo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop&crop=center",
                profileUrl: "https://example.com/coffemasters",
                purchaseUrl: "https://example.com/buy/coffee"
            }
        }
    ];

    // Load initial reels
    useEffect(() => {
        const loadReels = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setReels(mockReels);
            setLoading(false);
        };
        // loadReels();
    }, []);

    useEffect(() => {
        const getData = async () => {
            try {
                const items = await axios.get("http://localhost:3000/api/reels", {
                    withCredentials: true
                });
                console.log(items.data.items);
                setReels(items.data.items);
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [])

    // Load more reels when scrolling near bottom
    const loadMoreReels = async () => {
        if (!hasMore || loading) return;

        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const moreReels = mockReels.map(reel => ({
            ...reel,
            id: reel.id + reels.length,
        }));

        setReels(prev => [...prev, ...moreReels]);
        setLoading(false);
    };

    // Detect when user reaches near bottom
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - 1000) {
                // loadMoreReels();
            }
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [reels, loading, hasMore]);

    if (loading && reels.length === 0) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
        );
    }

    return (
        <div className="relative h-screen bg-black overflow-hidden">
            <div
                ref={containerRef}
                className="h-full overflow-y-auto scrollbar-hide"
                style={{
                    scrollSnapType: 'y mandatory',
                    scrollBehavior: 'smooth',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

                {reels.map((reel, index) => (
                    <div key={reel._id} style={{ scrollSnapAlign: 'start' }}>
                        <ReelItem reel={reel} index={index} isGloballyMuted={isGloballyMuted} setIsGloballyMuted={setIsGloballyMuted} />
                    </div>
                ))}

                {loading && reels.length > 0 && (
                    <div className="h-screen bg-black flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                )}
            </div>

        </div>
    );
}
