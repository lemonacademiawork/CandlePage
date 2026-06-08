export default function VideoSection() {
    return (
        <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto reveal" id="intro-video">
            <div className="overflow-hidden rounded-3xl border border-outline-variant/30 shadow-2xl aspect-video bg-surface-container">
                <video controls className="w-full h-full object-cover">
                    <source src="/videos/CANDLE VIDEO .mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </section>
    );
}