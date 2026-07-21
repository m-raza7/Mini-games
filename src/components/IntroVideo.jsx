import { useEffect, useRef, useState } from "react";

const IntroVideo = ({ onFinish }) => {
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const playVideo = async () => {
            try {
                await video.play();
            } catch (err) {
                console.log(err);
            }
        };

        playVideo();
    }, []);

    return (
        <div className="fixed inset-0 z-[999999] bg-black flex items-center justify-center overflow-hidden">
            <video
                ref={videoRef}
                preload="auto"
                autoPlay
                muted
                playsInline
                controls={false}
                disablePictureInPicture
                controlsList="nodownload noplaybackrate nofullscreen"
                style={{
                    opacity: videoReady ? 1 : 0,
                    transition: "opacity .4s"
                }}
                onCanPlayThrough={() => setVideoReady(true)}

                onEnded={onFinish}
                className="max-w-full max-h-full w-auto h-auto"
            >
                <source src="/intro-video.mp4" type="video/mp4" />
            </video>
        </div>
    );
};


export default IntroVideo;



