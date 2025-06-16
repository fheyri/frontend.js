import { useEffect } from 'react';

export default function AboutMe() {
  useEffect(() => {
    // Animation trigger on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
          element.classList.add('animate-fade-in');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 p-8">
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-on-scroll {
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-16 animate-on-scroll">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            About <span className="text-indigo-600">BlueLibrary</span>
          </h1>
          <p className="text-xl text-blue-800 max-w-2xl mx-auto">
            Connecting readers with the world's stories
          </p>
        </header>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="animate-on-scroll delay-100">
            <div className="relative rounded-2xl overflow-hidden shadow-xl h-80 bg-blue-100 flex items-center justify-center">
              <div className="text-8xl">📚</div>
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md">
                <span className="text-blue-600 text-xl">✨</span>
              </div>
            </div>
          </div>

          {/* Right Column - Text */}
          <div className="animate-on-scroll delay-200">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-6">
              BlueLibrary was born from a passion for literature and a desire to create a space where book lovers can discover stories from around the world. What started as a small collection has grown into a thriving community of readers.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">🌍</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Global Perspective</h3>
                  <p className="text-gray-600">Books from 50+ countries in multiple languages</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600">💡</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Curated Selection</h3>
                  <p className="text-gray-600">Handpicked titles by our team of bibliophiles</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20 animate-on-scroll delay-300">
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Our Values</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: '🤝',
                title: 'Community',
                description: 'Building connections between readers worldwide'
              },
              {
                icon: '📖',
                title: 'Quality',
                description: 'Only the finest literature in our collection'
              },
              {
                icon: '🌱',
                title: 'Growth',
                description: 'Helping readers expand their horizons'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-blue-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center animate-on-scroll delay-300">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Join Our Reading Community</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Discover your next favorite book and connect with fellow readers around the globe
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition">
            Explore Our Collection
          </button>
        </div>
      </div>
    </div>
  );
}