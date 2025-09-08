import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ReelItem from "../../components/ReelItem";

// Custom hook for video autoplay with Promise handling

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
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Amazing Wireless Earbuds",
      description:
        "Experience crystal clear sound with our premium wireless earbuds",
      likes: 1234,
      duration: 15,
      partner: {
        name: "TechGear Pro",
        logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center",
        profileUrl: "https://example.com/techgear",
        purchaseUrl: "https://example.com/buy/earbuds",
      },
    },
    {
      id: 2,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Stylish Running Shoes",
      description:
        "Run in comfort and style with our latest athletic collection",
      likes: 856,
      duration: 20,
      partner: {
        name: "SportZone",
        logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=100&h=100&fit=crop&crop=center",
        profileUrl: "https://example.com/sportzone",
        purchaseUrl: "https://example.com/buy/shoes",
      },
    },
    {
      id: 3,
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "Premium Coffee Blend",
      description: "Wake up to the perfect morning with our artisanal coffee",
      likes: 2341,
      duration: 18,
      partner: {
        name: "Coffee Masters",
        logo: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=100&h=100&fit=crop&crop=center",
        profileUrl: "https://example.com/coffemasters",
        purchaseUrl: "https://example.com/buy/coffee",
      },
    },
  ];

  // Load initial reels
  useEffect(() => {
    const loadReels = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setReels(mockReels);
      setLoading(false);
    };
    // loadReels();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const items = await axios.get("http://localhost:3000/api/reels", {
          withCredentials: true,
        });
        console.log(items.data.items);
        setReels(items.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // Load more reels when scrolling near bottom
  const loadMoreReels = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const moreReels = mockReels.map((reel) => ({
      ...reel,
      id: reel.id + reels.length,
    }));

    setReels((prev) => [...prev, ...moreReels]);
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

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
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
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {reels.map((reel, index) => (
          <div key={reel._id} style={{ scrollSnapAlign: "start" }}>
            <ReelItem
              reel={reel}
              index={index}
              isGloballyMuted={isGloballyMuted}
              setIsGloballyMuted={setIsGloballyMuted}
            />
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
